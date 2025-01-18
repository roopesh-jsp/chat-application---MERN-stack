import { CrossIcon, X } from "lucide-react";
import React from "react";

function Modal({ children, onClose, title }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal_head">
          <h3>{title}</h3>
          <span onClick={onClose}>
            <X />
          </span>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
