import React, { useContext } from "react";
import { AuthContext } from "../store/authContext";
import Auth from "./Auth";
import { useNavigate } from "react-router-dom";

export default function Protector({ children }) {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  if (token) {
    return <>{children}</>;
  } else {
    return <Auth />;
  }
}
