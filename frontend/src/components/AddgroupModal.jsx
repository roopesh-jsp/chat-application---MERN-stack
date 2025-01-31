import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { Plug2Icon, Plus, Send } from "lucide-react";
import { useAppContext } from "../context/AppProvider";
import { toast } from "react-toastify";
import SearchResult from "./SearchResult";
import SearchresultGroup from "./SearchresultGroup";
import axios from "axios";
import { data } from "react-router-dom";
import Pill from "./Pill";
import { useChatContext } from "../context/ChatProvider";

function AddgroupModal({ toggle, isEdit, users }) {
  const { backendUrl, token } = useAppContext();
  const { fetchChats, selectedChat } = useChatContext();

  const [searchTerm, setSearchterm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [chatName, setChatName] = useState(
    isEdit ? selectedChat?.chatName : ""
  );

  const [selectedUsers, setSelectedUser] = useState([...users]);

  async function searchUsers() {
    try {
      const { data } = await axios.get(
        backendUrl + "/user/users?search=" + searchTerm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        let finalUsers = [];
        if (isEdit) {
          finalUsers = data.users.filter(
            (us) => !users.some((existingUser) => existingUser._id === us._id)
          );
        } else {
          finalUsers = data.users;
        }
        setSearchResult(finalUsers);
        console.log(finalUsers);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    searchUsers();
  }, [searchTerm]);

  function removeSelectedUser(userId) {
    setSelectedUser((prev) => {
      const newUsers = prev.filter((user) => user._id != userId);

      return newUsers;
    });
  }

  async function handleCreateGroup() {
    try {
      if (chatName.length === 0) {
        setChatName("un-named grp chat");
      }
      let data;
      if (isEdit) {
        const res = await axios.post(
          backendUrl + "/chats/update-group",
          {
            chatName,
            chatId: selectedChat._id,
            users: selectedUsers,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        data = res.data;
      } else {
        const res = await axios.post(
          backendUrl + "/chats/create-group",
          {
            chatName,
            users: selectedUsers,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        data = res.data;
      }
      if (data.success) {
        toggle();
        setSearchResult([]);
        setSearchterm("");
        setSelectedUser([]);
        fetchChats();
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Modal title={"add new group"} onClose={toggle}>
        <div>
          {" "}
          <div className="searchbar grp_search">
            <input
              type="text"
              placeholder="chat name..."
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
            />
            <input
              type="search"
              value={searchTerm}
              placeholder="serach ..."
              onChange={(e) => setSearchterm(e.target.value)}
            />
            <button className="searchbar_btn " onClick={handleCreateGroup}>
              {isEdit ? "add users" : "add group"}
            </button>
          </div>
          <div className="pills">
            {selectedUsers.map((user, idx) => {
              return (
                <Pill
                  key={idx}
                  user={user}
                  remove={() => removeSelectedUser(user._id)}
                >
                  {user.name}
                </Pill>
              );
            })}
          </div>
          <div className="search_results">
            {searchResult.length === 0 ? (
              <>
                {" "}
                <h3 className="search_results_fallback">no users found</h3>
              </>
            ) : (
              <>
                {searchResult
                  .filter(
                    (result) =>
                      !selectedUsers.some((us) => us._id === result._id)
                  )
                  .map((result, idx) => (
                    <SearchresultGroup
                      key={idx}
                      data={result}
                      click={() => setSelectedUser((prev) => [...prev, result])}
                    />
                  ))}
              </>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AddgroupModal;
