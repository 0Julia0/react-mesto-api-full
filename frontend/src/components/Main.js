import React from "react";
import update from '../images/update.svg';
import Card from './Card';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__group" onClick={onEditAvatar}>
          <span className="profile__opacity">
            <img className="profile__update" src={update} alt="Обновить"></img>
          </span>
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt={currentUser.name}
          ></img>
        </div>
        <div className="profile__text">
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__job">{currentUser.about}</p>
          </div>
          <button
            className="profile__edit"
            aria-label="edit"
            type="button"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map(card => 
          <Card
            key={card._id}
            onCardClick={onCardClick}
            card={card}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        )}
      </section>
    </main>
  );
}

export default Main;