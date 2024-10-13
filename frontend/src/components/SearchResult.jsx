import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

function SearchResult({ user }) {
  return (
    <Box padding={"10px"} display={"flex"} gap="20px" m={"10px"}>
      <Avatar src={user.image} name={user.name} size={"sm"} />
      <Text>{user.name}</Text>
    </Box>
  );
}

export default SearchResult;
