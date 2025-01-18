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

function AddgroupModal({ toggle }) {
  const { backendUrl, token } = useAppContext();
  const { fetchChats } = useChatContext();

  const [searchTerm, setSearchterm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [chatName, setChatName] = useState("");

  const [selectedUsers, setSelectedUser] = useState([]);

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
        setSearchResult(data.users);
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
      const { data } = await axios.post(
        backendUrl + "/chats/create-group",
        {
          chatName,
          users: selectedUsers,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(data);
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
            <button className="searchbar_btn" onClick={handleCreateGroup}>
              add group
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
                {" "}
                {searchResult.map((result, idx) => (
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
