import React, { createContext, useContext } from "react";

const ChatContext = createContext({});
function ChatProvider({ children }) {
  const ctxVal = {};
  return <ChatContext.Provider value={ctxVal}>{children}</ChatContext.Provider>;
}

export const useChatContext = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
