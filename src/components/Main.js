import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Main({
  onLogoutClick,
  email,
  onCardClick,
  onCardLike,
  onCardDelete,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header onLogoutClick={onLogoutClick} email={email} />
      <main className="content">
        <section className="profile">
          <img
            className="profile__img"
            src={currentUser.avatar}
            alt={currentUser.name}
          />
          <button
            className="button_type_ava"
            onClick={onEditAvatar}
            title="Обновить аватар"
          />
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              aria-label="edit"
              className="button button_type_edit profile__edit-btn"
              onClick={onEditProfile}
            />
            <p className="profile__about-me">{currentUser.about}</p>
          </div>
          <button
            type="button"
            aria-label="add"
            className="button button_type_add profile__add-btn"
            onClick={onAddPlace}
          />
        </section>

        <section className="elements">
          <ul className="elements__list">
            {cards.map((item) => (
              <Card
                key={item._id}
                link={item.link}
                name={item.name}
                likes={item.likes.length}
                card={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;
