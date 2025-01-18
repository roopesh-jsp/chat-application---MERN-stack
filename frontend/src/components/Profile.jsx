import React from "react";
import Modal from "./Modal";

function Profile({ user, toggle }) {
  console.log(toggle);

  return (
    <Modal title="Profile" onClose={toggle}>
      <div className="user_profile">
        <img src={user?.image} alt="" />
        <div className="user_profile_data">
          <h3>{user?.name}</h3>
          <p>{user?.email}</p>
        </div>
      </div>
    </Modal>
  );
}

export default Profile;
