import React, { useState } from "react";

function Login() {
  const [state, setState] = useState("login");
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const extractedData = Object.fromEntries(formData);
    console.log(extractedData, state);
    e.target.reset();
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
