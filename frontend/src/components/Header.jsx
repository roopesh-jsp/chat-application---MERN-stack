import React from "react";
import { User } from "lucide-react";
import { useAppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";

function Header() {
  const { setToken, user } = useAppContext();

  const navigate = useNavigate();

  async function handelLogout() {
    setToken();
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <header className="header">
      <div className="logo">Logo.</div>
      <div className="profile">
        <div className="profile_name">
          <User /> {user?.name}
        </div>
        <div className="dropdown">
          <span>profile</span>
          <span onClick={handelLogout}>logout</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
