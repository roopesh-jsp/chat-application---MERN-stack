import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function RootLaout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default RootLaout;
