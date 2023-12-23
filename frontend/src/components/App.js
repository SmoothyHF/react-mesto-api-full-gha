import React, { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../Auth";

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [imagePopupOpen, setImagePopupOpen] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    api.getUserInfo()
      .then(userData => {
        setCurrentUser(userData);
      })
      .catch(console.error)
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then(cards => {
        setCards(cards)
      })
      .catch(console.error)
  }, [])

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setImagePopupOpen(false)
    setInfoTooltipOpen(false)
  }

  function handleOverlayClick(evt) {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
      closeAllPopups();
    }
  }

  function handleCardClick(data) {
    setSelectedCard(data)
    setImagePopupOpen(true)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like === currentUser._id);

    if (!isLiked) {
      api.likeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch(console.error)
    } else {
      api.disLikeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch(console.error)
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(console.error);
  }

  function handleUpdateUser(formData) {

    api.changeUserInfo(formData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups()
      })
      .catch(console.error)
  }

  function handleUpdateAvatar(formData) {
    api.changeAvatar(formData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch(console.error)
  }

  function handleAddPlaceSubmit(cardData) {
    api.addCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch(console.error)
  }

  useEffect(() => {
    handleTokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleTokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      return auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true)
            setEmail(res.email);
            navigate('/', { replace: true });
          }
        })
        .catch(console.error)
    }
  }

  function onSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setEmail();
    navigate('/sign-in');
  }

  const location = useLocation();

  const isSignIn = location.pathname === '/sign-in'
  const isSignUp = location.pathname === '/sign-up'
  const isLogin = location.pathname === '/'

  function handleClickLog() {
    if (isLogin) {
      onSignOut();
    } if (isSignIn) {
      navigate('/sign-up');
    } if (isSignUp) {
      navigate('/');
    }
  }

  function success() {
    setIsSuccess(true);
    setInfoTooltipOpen(true);
  }

  function error() {
    setIsSuccess(false)
    setInfoTooltipOpen(true);
  }

  function onRegister({ email, password }) {
    return auth.register(email, password)
      .then(success)
      .catch(error)
  }

  function onLogin({ email, password }) {

    return auth.authorize(email, password).then((res) => {
      if (!res) throw new Error('Неправильные имя пользователя или пароль');
    })
      .then(() => {
        setLoggedIn(true)
        setEmail(email)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header
          email={email}
          loggedIn={loggedIn}
          handleClickLog={handleClickLog}
          onSignOut={onSignOut} />

        <Routes>
          <Route path="*" element={loggedIn ? <Navigate to="/sign-up" replace /> : <Navigate to="/sign-in" replace />} />
          <Route path="/" element={
            <ProtectedRoute element={
              <>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards} />
                <Footer />
              </>
            } isLoggedIn={loggedIn} />
          }
          />
          <Route path="/sign-in" element={<Login onLogin={onLogin} />} />
          <Route path="/sign-up" element={<Register onRegister={onRegister} />} />
        </Routes>

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isSuccess={isSuccess}
          onClose={closeAllPopups}
          overlayClick={handleOverlayClick} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          overlayClick={handleOverlayClick}
          onUpdateUser={handleUpdateUser} />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          overlayClick={handleOverlayClick}
          onAddPlaceSubmit={handleAddPlaceSubmit} />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          overlayClick={handleOverlayClick}
          onUpdateAvatar={handleUpdateAvatar} />

        <ImagePopup
          card={selectedCard}
          isOpen={imagePopupOpen}
          onClose={closeAllPopups}
          overlayClick={handleOverlayClick}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
