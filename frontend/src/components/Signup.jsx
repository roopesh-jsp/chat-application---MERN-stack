import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  useToken,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/authContext";
// import { useToken } from "../store/authContext";

export default function Signup() {
  const { handleTokenAdd } = useContext(AuthContext);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const formdata = new FormData(e.target);
    const objectData = Object.fromEntries(formdata);
    const res = await axios.post("http://localhost:3000/auth/register", {
      ...objectData,
    });
    console.log(res.data);

    if (res.data.success) {
      console.log("registered");
      handleTokenAdd(res.data.token);
      navigate("/");
      setErrors(null);
    } else {
      setErrors(res.data.msg);
    }
    setLoading(false);
  }
  return (
    <div className="form">
      <VStack>
        <form action="" onSubmit={handleSubmit}>
          <FormControl className="input" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              outline={"1px solid black"}
              type="email"
              placeholder="email"
              name="email"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>name</FormLabel>
            <Input
              outline={"1px solid black"}
              type="text"
              placeholder="name"
              name="name"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>password</FormLabel>
            <Input
              outline={"1px solid black"}
              type="password"
              placeholder="password"
              name="password"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>confirm password</FormLabel>
            <Input
              outline={"1px solid black"}
              type="password"
              placeholder="confirm password"
              name="confirmPassword"
            />
          </FormControl>
          {errors ? <h3 className="error_msg">{errors}</h3> : <></>}
          <Button mt={4} colorScheme="blue" type="submit" isDisabled={loading}>
            {loading ? "loading" : "sign in"}
          </Button>
        </form>
      </VStack>
    </div>
  );
}
