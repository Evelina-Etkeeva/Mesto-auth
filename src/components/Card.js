import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `button_type_delete ${
    isOwn
      ? "button button_type_delete element__delete-btn"
      : "button button_type_delete button_status_invisible element__delete-btn"
  }`;

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `button_tupe_like ${
    isLiked
      ? " button button_type_like element__like-btn active"
      : "button button_type_like element__like-btn"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="element">
      <img
        className="element__image"
        src={`${props.link}`}
        alt={props.name}
        title="Посмотреть в полном размере"
        onClick={handleClick}
      ></img>
      <h2 className="element__title">{props.name}</h2>
      <button
        type="button"
        aria-label="like"
        className={cardLikeButtonClassName}
        onClick={handleLikeClick}
      ></button>
      <span className="element__like-counter" type="number">
        {props.likes}
      </span>
      <button
        type="button"
        aria-label="delete"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
    </li>
  );
}

export default Card;
