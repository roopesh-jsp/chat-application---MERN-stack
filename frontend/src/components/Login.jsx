import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../context/AppProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  //creating state for login and signup
  const [state, setState] = useState("login");

  //getting values from context
  const { backendUrl, setToken, token } = useAppContext();

  //creating navigation instance
  const navigate = useNavigate();

  //redirecting if already logged in
  useEffect(() => {
    if (token) {
      navigate("/");
      return;
    }
  }, []);

  //form submition for login or signup
  async function handleSubmit(e) {
    //prevetning default submition
    e.preventDefault();

    //extracting the formData
    const formData = new FormData(e.target);
    const extractedData = Object.fromEntries(formData);

    //checking for login or signup
    if (state === "login") {
      //login

      //sending login request to backend
      const { data } = await axios.post(
        backendUrl + "/user/login",
        extractedData
      );

      console.log(data);

      // checking for error and success
      if (data.success) {
        //toast message
        toast.success(data.message);

        //storing token
        setToken(data.token);
        localStorage.setItem("token", data.token);

        //navigatinng user on success
        navigate("/");
        //reseting form
        e.target.reset();
      } else {
        //toast message
        toast.error(data.message);
      }
    } else {
      //signup
    }
  }

  return (
    <div className="login">
      <h1 className="login_heading">{state}</h1>
      <form onSubmit={handleSubmit} className="login_form">
        {state === "signup" && (
          <input type="text" name="name" placeholder="name" />
        )}
        <input type="text" placeholder="email" name="email" />
        <input type="password" name="password" placeholder="password" />

        <button className="btn login_btn">{state}</button>
        <span>
          {state == "login" ? "didn't" : ""} have a account{" "}
          <span
            onClick={() =>
              setState((prev) => (prev === "login" ? "signup" : "login"))
            }
            className="link"
          >
            click me
          </span>
        </span>
      </form>
    </div>
  );
}

export default Login;
