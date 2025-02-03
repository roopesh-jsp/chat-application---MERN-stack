import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import AddgroupModal from "./AddgroupModal";
import { useChatContext } from "../context/ChatProvider";
import { useAppContext } from "../context/AppProvider";

function GroupProfile({ users, toggle }) {
  const { user } = useAppContext();
  const { selectedChat } = useChatContext();
  const [isAdding, setIsAdding] = useState(false);

  return (
    <>
      {isAdding ? (
        <AddgroupModal isEdit={true} users={users} toggle={toggle} />
      ) : (
        <Modal title="users" onClose={toggle}>
          <div className="gropu_modal">
            <div className="group_modal_header">
              {selectedChat.groupAdmin._id === user._id ? (
                <button onClick={() => setIsAdding(true)}>edit group</button>
              ) : (
                <></>
              )}
            </div>
            <div className="group_users">
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
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default GroupProfile;
