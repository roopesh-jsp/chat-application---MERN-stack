import React from "react";
import Modal from "./Modal";
import { useChatContext } from "../context/ChatProvider";
import GroupProfile from "./GroupProfile";

function Profile({ data, toggle }) {
  const { selectedChat } = useChatContext();
  console.log(data);

  return (
    <Modal title="Profile" onClose={toggle}>
      <div className="user_profile">
        <img src={data?.image} alt="" />
        <div className="user_profile_data">
          <h3>{data?.name}</h3>
          <p>{data?.email}</p>
        </div>
      </div>
    </Modal>
  );
}

export default Profile;
