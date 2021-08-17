import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete, }) {
    const currentUser = React.useContext(CurrentUserContext);
    
    const isOwn = card.owner === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__remove ${isOwn ? 'element__remove-visible' : 'element__remove-hidden'}`
      );
    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (
        `element__heart ${isLiked ? 'element__heart-active' : 'element__heart'}`
      ); 

    function handleClick() {
        onCardClick(card);
      } 
    
    function handleLikeClick() {
        onCardLike(card);
    };

    const handleDeleteClick = () => {
        onCardDelete(card);
      };

      return (
        <article className="element">
          <div className="element__front">
            <button
              className={cardDeleteButtonClassName}
              onClick={handleDeleteClick}
              aria-label="remove"
              type="button"
            ></button>
            <img
              className="element__photo"
              src={card.link}
              alt={card.name}
              onClick={handleClick}
            />
          </div>
          <div className="element__group">
            <p className="element__text">{card.name}</p>
            <div className="element__info">
              <button
                className={cardLikeButtonClassName}
                onClick={handleLikeClick}
                aria-label="like"
                type="button"
              ></button>
              <p className="element__number">{card.likes.length}</p>
            </div>
          </div>
        </article>
      );
}

export default Card;