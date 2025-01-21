import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAppContext } from "./AppProvider";
import { toast } from "react-toastify";

const ChatContext = createContext({
  allChats: [],
  setAllChats: () => {},
  fetchChats: () => {},
  selectedChat: {},
  setSelectedChat: () => {},
  notifications: [],
  setNotifications: () => {},
});

function ChatProvider({ children }) {
  const { token } = useAppContext();
  const [allChats, setAllChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchChats = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/chats/fetch-chats",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setAllChats(data.chats);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);
  const ctxVal = {
    fetchChats,
    allChats,
    setAllChats,
    selectedChat,
    setSelectedChat,
    notifications,
    setNotifications,
  };
  return <ChatContext.Provider value={ctxVal}>{children}</ChatContext.Provider>;
}

export const useChatContext = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
