import React from "react";
import successIcon from "../images/success.svg";
import rejectIcon from "../images/reject.svg";

function InfoTooltip({ isOpen, onClose, isSuccessfulReg, title }) {
  return (
    <section className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button "
          aria-label="close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup__icon"
          alt="Проверка регистрации"
          src={isSuccessfulReg ? successIcon : rejectIcon}
        ></img>
        <p className="popup__message">{title}</p>
      </div>
    </section>
  );
}

export default InfoTooltip;