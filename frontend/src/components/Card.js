import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(i => i === currentUser._id);

  const cardLikeButtonClassName = (`elements__like ${isLiked && 'elements__like-active'}`);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  
  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <div className="elements__card">
      <div className="elements__container-image">
        {isOwn && <button className="elements__delete" onClick={handleDeleteClick} type="button" />}
        <button className="elements__photo-button" onClick={handleClick} type="button">
          <img className="elements__photo" alt={props.card.name} src={props.card.link} />
        </button>
      </div>
      <div className="elements__container">
        <h2 className="elements__text">{props.card.name}</h2>
        <div className="elements__container-likes">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <p className="elements__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}