import { Cross } from "lucide-react";
import React from "react";

function Pill({ user, remove }) {
  return (
    <span className="pill">
      <>{user.name}</>
      <span onClick={remove}>X</span>
    </span>
  );
}

export default Pill;
