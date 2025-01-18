import React, { useState } from "react";
import { EggFriedIcon, Plus, User, User2 } from "lucide-react";
import { useAppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import SearchUser from "./SearchUser";
import Profile from "./Profile";

function Header() {
  const { setToken, user } = useAppContext();

  //set to toggle searching user modal
  const [showSearchUser, setShowSearchUser] = useState(false);

  //state to toggle profile viewing
  const [showProfile, setShowProfile] = useState(false);

  //function to togle searching user model
  function toogleSeachingUser() {
    setShowSearchUser((prev) => !prev);
  }

  //function to toggle profile modal
  function toggleProfile() {
    setShowProfile((prev) => !prev);
  }
  const navigate = useNavigate();

  async function handelLogout() {
    setToken();
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <header className="header">
      <div className="header_user_add" onClick={toogleSeachingUser}>
        <span className="header_user_add_plus">
          <Plus />
        </span>
        <span className="header_user_add_user">
          <User2 />
        </span>
      </div>

      <div className="logo">C.</div>
      {/* <div className="header_title">
        <span>C</span>hat.
      </div> */}
      <div className="profile">
        <div className="profile_img">
          <img src={user?.image} alt="" />
        </div>

        <div className="dropdown">
          <span onClick={toggleProfile}>profile</span>
          <hr />
          <span onClick={handelLogout}>logout</span>
        </div>
      </div>
      {showSearchUser ? (
        <SearchUser
          toggle={toogleSeachingUser}
          setShowSearchUser={setShowSearchUser}
        />
      ) : (
        <></>
      )}
      {showProfile ? <Profile toggle={toggleProfile} user={user} /> : <></>}
    </header>
  );
}

export default Header;
