import React from "react";
import { useAppContext } from "../context/AppProvider";
import { useChatContext } from "../context/ChatProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SearchResult({ data, onClose }) {
  const { token, backendUrl } = useAppContext();
  const { fetchChats } = useChatContext();
  const navigate = useNavigate("/");
  const createChat = async (userId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/chats/access-chat",
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        fetchChats();
        console.log(onClose);

        onClose((prev) => !prev);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="search_result" onClick={() => createChat(data._id)}>
      <img src={data.image} alt="" />

      <div className="search_result_data">
        <h3>{data.name}</h3>
        <p>{data.email}</p>
      </div>
    </div>
  );
}

export default SearchResult;
