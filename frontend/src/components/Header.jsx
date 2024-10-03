import React, { useContext } from "react";
import { AuthContext } from "../store/authContext";

export default function Header() {
  const { handleTokenRemone, token } = useContext(AuthContext);
  return (
    <div>
      {token ? <button onClick={handleTokenRemone}>logout</button> : <></>}
    </div>
  );
}
