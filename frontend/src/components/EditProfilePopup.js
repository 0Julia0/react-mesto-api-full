import React from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSaving }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);
  const submitButton = isSaving ? 'Сохранение...' : 'Создать';

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen ? "popup_opened" : ""}
      onClose={onClose}
      buttonText={submitButton}
      onSubmit={handleSubmit}
      isSaving={isSaving}
    >
      <input
        value={name || ""}
        onChange={handleChangeName}
        className="popup__info"
        placeholder="Имя"
        type="text"
        name="name"
        required
        minLength="2"
        maxLength="40"
      />
      <span className="name-error popup__input-error"></span>
      <input
        value={description || ""}
        onChange={handleChangeDescription}
        className="popup__info"
        placeholder="Занятие"
        type="text"
        name="job"
        required
        minLength="2"
        maxLength="200"
      />
      <span className="job-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;