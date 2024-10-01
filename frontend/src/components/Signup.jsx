import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from "@chakra-ui/react";
import React from "react";

export default function Signup() {
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("hai");
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata);
    console.log(data);
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
              name="confirm_password"
            />
          </FormControl>
          <Button mt={4} colorScheme="blue" type="submit">
            sign in
          </Button>
        </form>
      </VStack>
    </div>
  );
}
