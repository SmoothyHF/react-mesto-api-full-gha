import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, cards, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext)
  
  return (
    <main className="content">
      <section className="profile">
        <button className="profile__button-avatar" onClick={onEditAvatar} type="button">
          <img className="profile__image" src={currentUser.avatar} alt="аватар" />
        </button>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__button-edit" onClick={onEditProfile} type="button"></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button className="profile__button-add" onClick={onAddPlace} type="button"></button>
      </section>

      <section className="elements">
        {cards.map((card) => {
          return <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
        })}
      </section>
    </main>
  )
}

export default Main;