import React, { useContext, useState } from "react";
import { AuthContext } from "../store/authContext";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Modal,
  Text,
  Toast,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ModalComp } from "./Modal";
import SearchResult from "./SearchResult";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const { handleTokenRemone, token, user } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  async function handelSearch() {
    if (!searchTerm) {
      toast({
        title: "enter something to search",
        status: "warning",
        duration: 2000,
        position: "top-left",
        isClosable: true,
      });
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:3000/auth/users?search=${searchTerm}`,
        config
      );
      console.log(data.users);
      setSearchResult(data.users);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <header>
      <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
        <Button variant="ghost" onClick={onOpen}>
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
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent display={"flex"}>
          <DrawerCloseButton />
          <DrawerHeader width={"full"}>search users</DrawerHeader>

          <DrawerBody>
            <Box display={"flex"} gap={"4px"}>
              <Input
                placeholder="search"
                p="4px"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button onClick={handelSearch}>GO</Button>
            </Box>
            {searchResult.map((user, idx) => (
              <SearchResult key={idx} user={user} />
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </header>
  );
}
