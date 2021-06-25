import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import DeleteCardPopup from './DeleteCardPopup';
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import api from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isSaving, setIsSaving] = React.useState(false);
  const [cardDelete, setCardDelete] = React.useState({});
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [initialData, setInitialData] = React.useState({
    password: '',
    email: ''
  })
  const [isSuccessfulReg, setIsSuccessfulReg] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsArray]) => {
        setCurrentUser(userData);
        setCards(cardsArray);
      })
      .catch((err) => {
        console.log(err);
      })
   }
 }, [loggedIn]); 

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true, 
      link: card.link, 
      name: card.name
    });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({isOpen: false});
    setDeleteCardPopupOpen(false);
    setInfoTooltipOpen(false);
  }

  function handleUpdateUser(user) {
    setIsSaving(true);
    api.patchProfileInfo(user)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSaving(false);
      })
  }

  function handleUpdateAvatar(avatar) {
    setIsSaving(true);
    api.patchProfileAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSaving(false);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleCardDelete(card) {
    setIsSaving(true);
    api.deleteCard(card._id)
    .then(() => {
      setCards((prevCardsState) => prevCardsState.filter((c) => c._id !== card._id));
      closeAllPopups()
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    setIsSaving(false);
  })
}

function handleAddPlaceSubmit(card) {
  setIsSaving(true);
  api.postCard(card)
    .then((newCard) => {
      setCards([newCard, ...cards])
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsSaving(false);
    })
}

function handleDeleteCardClick(card) {
  setDeleteCardPopupOpen(true);
  setCardDelete(card);
}

const handleRegister = ({ password, email }) => {
  return auth.register(password, email)
  .then((res) => {
    setIsSuccessfulReg(true);
    history.push('/signin')
    return res
  })
  .catch((err) => {
    console.log(err);
    setIsSuccessfulReg(false);
  })
  .finally(() => {
    setInfoTooltipOpen(true)
  })
}

const handleLogin = ({ password, email }) => {
  return auth.authorize(password, email)
  .then(res => {
    if (res.token) {
      setInitialData({
        password: password,
        email: email
      })
      localStorage.setItem('jwt', res.token )
      setLoggedIn(true)
    }
    history.push('/')
    })
    .catch((err) => {
      console.log(err);
    });
}

const tokenCheck = React.useCallback(() => {
  const jwt = localStorage.getItem('jwt')
  if (!jwt) {
    return
  }
    auth.getContent(jwt)
    .then((res) => {
      setInitialData({
          password: res.data.password,
          email: res.data.email
        })
        setLoggedIn(true);
        history.push('/')
      })
    .catch((err) => {
      console.log(err);
      history.push('/signin')
    });
}, [history])

React.useEffect(() => {
  tokenCheck()
}, [tokenCheck])

const handleSignOut = () => {
  localStorage.removeItem('jwt')
  setLoggedIn(false)
  history.push('/signin')
}

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
        <Header onSignOut={handleSignOut} loggedIn={loggedIn} email={initialData.email}/>
        <Switch>
          <ProtectedRoute path="/"
            component={Main}
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
            cards={cards}
          />
          <Route path="/signup">
            <Register onRegister={handleRegister}/>
          </Route>
          <Route path="/signin">
            <Login onLogin={handleLogin}/>
          </Route>
          <Route path="/">
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
              </Route>
        </Switch>
        {loggedIn && <Footer />}

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isSaving={isSaving}
          />
          
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isSaving={isSaving}
          />
          
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isSaving={isSaving}
          />
          
          <DeleteCardPopup 
          card={cardDelete}
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          isSaving={isSaving}
        />
          
          <ImagePopup
            isOpen={selectedCard.isOpen}
            name="photo"
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <InfoTooltip 
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isSuccessfulReg={isSuccessfulReg}
            title={isSuccessfulReg ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
          />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
