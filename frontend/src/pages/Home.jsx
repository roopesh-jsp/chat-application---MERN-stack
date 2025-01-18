// import { Sidebar } from "lucide-react";
import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

function Home() {
  return (
    <div className="main">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default Home;
