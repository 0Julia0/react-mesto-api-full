import React from "react";

function ImagePopup({ isOpen, name, onClose, card }) {
    return (
        <section className={`popup ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container" id={`${name}-container`}>
                <button 
                    className="popup__close-button" 
                    aria-label="close" 
                    type="button" 
                    onClick={onClose}></button>
                <img className="popup__photo" src={card.link} alt={card.name} />
                <p className="popup__text">{card.name}</p>
            </div>
        </section>
    )
  }
  
  export default ImagePopup;