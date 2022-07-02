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
import ProtectedRoute from "./ProtectedRoute";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import { register, login, checkUser } from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

function App() {
  const history = useHistory();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [infoTooltipIsOpen, setInfoTooltipIsOpen] = useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = useState("");
  const [infoTooltipAlt, setInfoTooltipAlt] = useState("");
  const [infoTooltipSuccess, setInfoTooltipSuccess] = useState(true);

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
    setInfoTooltipIsOpen(false);
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

  function handleSignupSubmit(data) {
    register(data.password, data.email)
      .then(() => {
        history.push("/signin");
        setInfoTooltipSuccess(true);
        setInfoTooltipMessage("Вы успешно зарегистрировались!");
        setInfoTooltipAlt("Изображение информирующее, что всё хорошо!");
      })
      .catch((err) => {
        setInfoTooltipSuccess(false);
        setInfoTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
        setInfoTooltipAlt("Изображение информирующее, что всё плохо!");
        console.log("Something went wrong: ", err);
      })
      .finally(() => {
        setInfoTooltipIsOpen(true);
      });
  }

  function handleSigninSubmit(data) {
    login(data.password, data.email)
      .then((res) => {
        if (res.token) {
          // сохраняем токен
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          // history.push("/");
          // console.log(`loggedIn: ${loggedIn}`);
          console.log(`response: ${res.token}`); // - false
        }
       
      
      })
      .catch((err) => {
        console.log("Something went wrong: ", err);
      });
  }

  function tokenCheck() {
    const token = localStorage.getItem("token");
    console.log(`loggedIn: ${loggedIn}`);
    if (token) {
      checkUser(token)
        .then(res => {
          if (res){
            setLoggedIn(true);
            console.log(`loggedIn 2: ${loggedIn}`);
            return 'logged in';
          }
        })
        .catch((err) => {
          console.log("Something went wrong: ", err);
        });
    }
  }

  function handleSignout(){
    localStorage.removeItem("token");
    setLoggedIn(false);
    history.push("/signin");
  }



  React.useEffect(() => {
    tokenCheck()
  }, [])

  // React.useEffect(() => {
  //   history.push("/")
  // }, [loggedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route path="/signin">
            <Signin onSignin={handleSigninSubmit} />
          </Route>
          <Route path="/signup">
            <Signup onSignup={handleSignupSubmit} />
            <InfoTooltip
              isOpen={infoTooltipIsOpen}
              title={infoTooltipMessage}
              alt={infoTooltipAlt}
              res={infoTooltipSuccess}
              onClose={closeAllPopups}
            />
          </Route>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <>
              <Header onLogoutClick={handleSignout}/>
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
            </>
          </ProtectedRoute>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
