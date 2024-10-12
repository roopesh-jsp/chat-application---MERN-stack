import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

export function ModalComp({ user, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} width="full">
        {children}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg={"white"}>profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir={"column"}
            alignItems="center"
            justifyContent="space-between"
            width="full"
            gap={"10px"}
          >
            <Avatar src={user.image} name={user.name} size={"xl"} />
            <h2>{user.name}</h2>
            <h3>{user.email}</h3>
          </ModalBody>
          <ModalFooter>
            {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
