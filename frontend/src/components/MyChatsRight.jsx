import React, { useContext, useState } from "react";
import { ModalComp } from "./Modal";
import { AuthContext } from "../store/authContext";
import { ViewIcon } from "@chakra-ui/icons";
import { senderName } from "../config/chatsLogic";

export default function MyChatsRight() {
  const { user, selectedChat } = useContext(AuthContext);

  const [message, setMessage] = useState("");
  async function sendMsg() {
    setMessage("");
  }
  return (
    <div className="myChats_right">
      {selectedChat.users ? (
        <div className="myChats_right_1">
          <div className="myChats_right_top">
            {" "}
            <h2>{senderName(selectedChat.users, user).name}</h2>
            <ModalComp user={senderName(selectedChat.users, user)}>
              <ViewIcon />
            </ModalComp>
          </div>
          {/* <div className="messagess">
        
      </div> */}

          <div className="message_input">
            <input
              type="text"
              placeholder="type ..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMsg}>send</button>
          </div>
        </div>
      ) : (
        <>
          <h1>select one user</h1>
        </>
      )}
    </div>
  );
}
