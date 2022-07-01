import React, { useEffect, useState } from "react";
import "./../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import myApi from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from './ProtectedRoute';
import { Route, Switch } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    Promise.all([myApi.getInitialCards(), myApi.getUserData()])
      .then(([data, user]) => {
        setCards(data);
        setCurrentUser(user);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      myApi
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      myApi
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setSelectedCard(null);
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpen(true);
  }

  function handleCardDelete(card) {
    myApi
      .deleteCard(card._id)
      .then(() => {
        setCards((items) => items.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateUser(data) {
    myApi
      .updateUserData(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateAvatar(data) {
    myApi
      .updateAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    myApi
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Switch>
        <Route path="/sign-in" loggedIn={loggedIn}>
          <SignIn />
        </Route>
        <Route path="/sign-up" loggedIn={loggedIn}>
          <SignUp />
        </Route>
        <ProtectedRoute path='/' loggedIn={loggedIn}>
          <Header />
          <Main
            onAddPlace={handleAddCardClick}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddCardPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleAddPlaceSubmit}
          />
        
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleUpdateAvatar}
          />
          
          </ProtectedRoute>
      </Switch>
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
