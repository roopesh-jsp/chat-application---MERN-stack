import React, { useEffect } from "react";
import { useAppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";

function Protector({ children }) {
  const { token } = useAppContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
  }, []);
  return <div>{children}</div>;
}

export default Protector;
