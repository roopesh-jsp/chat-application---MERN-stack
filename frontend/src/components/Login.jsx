import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import React from "react";

export default function Login() {
  return (
    <div className="form">
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
