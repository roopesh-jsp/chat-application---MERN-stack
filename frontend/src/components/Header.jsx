import React, { useContext } from "react";
import { AuthContext } from "../store/authContext";

import { Avatar, Button, Modal, Text, Tooltip } from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ModalComp } from "./Modal";

export default function Header() {
  const { handleTokenRemone, token, user } = useContext(AuthContext);
  return (
    <header>
      <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
        <Button variant="ghost">
          <Search2Icon />
          <Text fontFamily="sans-serif" px={4}>
            Search User
          </Text>
        </Button>
      </Tooltip>
      <Text
        display={{ base: "none", md: "block" }}
        fontSize="2xl"
        fontFamily="Work sans"
      >
        Talk-A-Tive
      </Text>
      <div className="header_menus">
        <Menu>
          <MenuButton fontSize={"2xl"}>
            <BellIcon />
          </MenuButton>
          {/* <MenuList>
            <MenuItem>Attend a Workshop</MenuItem>
          </MenuList> */}
        </Menu>
        <Menu>
          <MenuButton
            fontSize={"2xl"}
            as={Button}
            bg="white"
            rightIcon={<ChevronDownIcon />}
          >
            <Avatar size="sm" name={user.name} src={user.image} />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <ModalComp user={user}>profile</ModalComp>
            </MenuItem>
            <MenuItem>
              <button onClick={handleTokenRemone}>logout</button>{" "}
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </header>
  );
}
