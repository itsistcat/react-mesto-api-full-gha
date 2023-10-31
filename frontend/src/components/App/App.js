import React, { useState, useCallback, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { api } from "../../utils/Api.js";
import { ProcessLoadingSpinnerContext } from '../../contexts/ProcessLoadingSpinnerContext.js';
import { getContent } from '../../utils/auth.js';

import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import PageNotFound from '../PageNotFound/PageNotFound.js';

import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';

import ImagePopup from '../ImagePopup/ImagePopup.js';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup.js';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup.js';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup.js';
import ConfirmCardDeletionPopup from '../ConfirmCardDeletionPopup/ConfirmCardDeletionPopup.js';


function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userData, setUserData] = useState({
    _id: '',
    email: ''
  });

  const [activeCardId, setActiveCardId] = useState('');
  const [isProcessLoading, setIsProcessLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(false);

  const [isImagePopupOpened, setIsImagePopupOpened] = useState(false);
  const [isActiveBurgerMenu, setIsActiveBurgerMenu] = useState(false);

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmationDeletePopupOpen, setConfirmationDeletePopupOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => {
          console.log(`Ошибка в процессе загрузки данных пользователя и галереи карточек: ${err}`);
        })
    }
  }, [isLoggedIn]);

  function handleLogin() {
    setIsLoggedIn(true);
  };

  const checkToken = useCallback(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      setIsAppLoading(true);
      getContent(jwt)
        .then((res) => {
          const data = res.data;
          const userData = {
            _id: data._id,
            email: data.email
          };
          setUserData(userData);
          handleLogin();
          navigate('/react-mesto-auth', { replace: true });
        })
        .catch((err) => {
          console.log(`Ошибка в процессе проверки токена пользователя и получения личных данных: ${err}`);
        })
        .finally(() => {
          setIsAppLoading(false);
        })
    };
  }, [navigate]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  function toggleBurgerMenu() {
    setIsActiveBurgerMenu(!isActiveBurgerMenu);
  };

  function openInfoTooltip() {
    setIsInfoTooltipOpened(true);
  };

  function openEditProfilePopup() {
    setEditProfilePopupOpen(true);
  };
  function openAddPlacePopup() {
    setAddPlacePopupOpen(true);
  };
  function openEditAvatarPopup() {
    setEditAvatarPopupOpen(true);
  };
  function openConfirmationCardDeletionPopup(card) {
    setConfirmationDeletePopupOpen(true);
    setActiveCardId(card._id);
  };
  function handleCardClick(cardData) {
    setSelectedCard(cardData);
    setIsImagePopupOpened(true);
  };


  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmationDeletePopupOpen(false);
    setIsImagePopupOpened(false);
    setIsInfoTooltipOpened(false);
  }

  useEffect(() => {
    if (!isImagePopupOpened) {
      setTimeout(() => setSelectedCard({}), 400);
    };
  }, [isImagePopupOpened]);

  const popupPackProps = {
    onClose: closeAllPopups,
    closePopupsOnOutsideClick: closePopupsOnOutsideClick,
    isProcessLoading: isProcessLoading
  };

  function closePopupsOnOutsideClick(evt) {
    const target = evt.target;
    const checkSelector = selector => target.classList.contains(selector);

    if (checkSelector('popup__opened') || checkSelector('popup__close')) {
      closeAllPopups();
    };
  };

  function handleUpdateUser(data) {
    setIsProcessLoading(true);
    api.editUserInfo(data.name, data.about)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка в процессе редактировании информации пользователя: ${err}`);
      })
      .finally(() => {
        setIsProcessLoading(false);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((cardLike) => {
        setCards(cards.map(c => c._id === card._id ? cardLike : c));
      })
      .catch((err) => {
        console.log(`Ошибка при добавлении или снятии лайка карточки: ${err}`);
      })
  };

  function handleCardDelete(activeCardId) {
    setIsProcessLoading(true);
    api.deleteCards(activeCardId)
      .then(() => {
        setCards(cards.filter(c => c._id !== activeCardId));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при удаления карточки: ${err}`);
      })
      .finally(() => {
        setIsProcessLoading(false);
      })
  };

  function handleUpdateAvatar(data) {
    setIsProcessLoading(true);
    api.editUserAvatar(data.avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка в процессе изменения аватара пользователя: ${err}`);
      })
      .finally(() => {
        setIsProcessLoading(false);
      })
  };

  function handleAddPlaceSubmit(data) {
    setIsProcessLoading(true);
    api.addNewCards(data.name, data.link)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка в процессе добавления новой карточки: ${err}`);
      })
      .finally(() => {
        setIsProcessLoading(false);
      })
  };

  if (isAppLoading) {
    return null;
  };

  console.log(isActiveBurgerMenu && 'active')

  return (
    <>

      <div className={`page ${isActiveBurgerMenu && 'active'}`}>
        <Routes>
          <Route path='react-mesto-auth/' element={
            <Header
              isActive={isActiveBurgerMenu}
              onActive={toggleBurgerMenu}
              userData={userData}
              setIsLoggedIn={setIsLoggedIn}
              toggleBurgerMenu={toggleBurgerMenu}
            />}>
            <Route
              index
              element={
                <>
                  <ProtectedRoute isLoggedIn={isLoggedIn} />
                  <>
                    <CurrentUserContext.Provider value={currentUser}>
                      <Main
                        onEditProfile={openEditProfilePopup}
                        onAddPlace={openAddPlacePopup}
                        onEditAvatar={openEditAvatarPopup}
                        onConfirmationCardDeletion={openConfirmationCardDeletionPopup}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}

                      />
                    </CurrentUserContext.Provider>
                    <Footer />

                    <CurrentUserContext.Provider value={currentUser}>
                      <ProcessLoadingSpinnerContext.Provider value={isProcessLoading}>
                        <EditProfilePopup
                          onUpdateUser={handleUpdateUser}
                          isOpened={isEditProfilePopupOpen}
                          onClose={closeAllPopups}
                          closePopupsOnOutsideClick={closePopupsOnOutsideClick}
                        />

                        <EditAvatarPopup
                          onUpdateAvatar={handleUpdateAvatar}
                          isOpened={isEditAvatarPopupOpen}
                          onClose={closeAllPopups}
                          closePopupsOnOutsideClick={closePopupsOnOutsideClick}
                        />

                        <AddPlacePopup
                          onAddPlace={handleAddPlaceSubmit}
                          isOpened={isAddPlacePopupOpen}
                          onClose={closeAllPopups}
                          closePopupsOnOutsideClick={closePopupsOnOutsideClick}
                        />


                        <ConfirmCardDeletionPopup
                          activeCardId={activeCardId}
                          onCardDelete={handleCardDelete}
                          isOpened={isConfirmationDeletePopupOpen}
                          onClose={closeAllPopups}
                          closePopupsOnOutsideClick={closePopupsOnOutsideClick}
                        />
                      </ProcessLoadingSpinnerContext.Provider>

                      <ImagePopup
                        card={selectedCard}
                        isImagePopupOpened={isImagePopupOpened}
                        onClose={closeAllPopups}
                        closePopupsOnOutsideClick={closePopupsOnOutsideClick}
                      />
                    </CurrentUserContext.Provider>
                  </>
                </>
              }
            />
            <Route path='sign-in' element={<Login
              handleLogin={handleLogin}
              isProcessLoading={isProcessLoading}
              setIsProcessLoading={setIsProcessLoading}
            />
            }
            />
            <Route path='sign-up' element={
              <Register
                popupPackProps={popupPackProps}

                setIsProcessLoading={setIsProcessLoading}
                isInfoTooltipOpened={isInfoTooltipOpened}
                onInfoTooltip={openInfoTooltip}
                isOpened={isInfoTooltipOpened}
              />
            }
            />
          </Route>
          <Route path='*' element={<PageNotFound />}
          />
        </Routes>
      </div>
    </>
  );
};
export default App;