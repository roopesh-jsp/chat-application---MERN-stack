import React from "react";
import { User } from "lucide-react";

function Header() {
  return (
    <header className="header">
      <div className="logo">Logo.</div>
      <div className="profile">
        <User />
        <div className="dropdown">
          <span>profile</span>
          <span>logout</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
