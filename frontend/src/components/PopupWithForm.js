import React from "react";

function PopupWithForm({ isOpen, onClose, title, onSubmit, children, buttonText }) {
  return (
    <section className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button "
          aria-label="close"
          type="button"
          onClick={onClose}
        ></button>
        <h1 className="popup__title">{title}</h1>
        <form className="popup__form" name="form" onSubmit={onSubmit} noValidate>
          {children}
          <button className="popup__button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;