import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import { useAppContext } from "../context/AppProvider";

function RootLaout() {
  const { token } = useAppContext();
  return (
    <div>
      {token ? <Header /> : <></>}

      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default RootLaout;
