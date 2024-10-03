import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/authContext";

export default function Login() {
  const navigate = useNavigate();
  const { handleTokenAdd } = useContext(AuthContext);
  async function handleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const objectData = Object.fromEntries(formdata);
    const res = await axios.post("http://localhost:3000/auth/login", {
      ...objectData,
    });
    console.log(res.data);

    if (res.data.success) {
      console.log("logged");
      handleTokenAdd(res.data.token);
      navigate("/");
    } else {
      console.log(res.data.msg);
    }
  }
  return (
    <div className="form" onSubmit={handleSubmit}>
      <VStack>
        <form action="">
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
            <FormLabel>password</FormLabel>
            <Input
              outline={"1px solid black"}
              type="password"
              placeholder="password"
              name="password"
            />
          </FormControl>

          <Button mt={4} colorScheme="blue" type="submit">
            log in
          </Button>
        </form>
      </VStack>
    </div>
  );
}
