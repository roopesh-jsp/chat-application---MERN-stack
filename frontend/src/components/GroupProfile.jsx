import React from "react";
import Modal from "./Modal";

function GroupProfile({ users, toggle }) {
  return (
    <Modal title="users" onClose={toggle}>
      {users?.map((data, idx) => {
        return (
          <div className="group_profile" key={idx}>
            <img src={data?.image} alt="" />

            <div className="group_proflie_data">
              <h3>{data?.name}</h3>
              <p>{data?.email}</p>
            </div>
          </div>
        );
      })}
    </Modal>
  );
}

export default GroupProfile;
