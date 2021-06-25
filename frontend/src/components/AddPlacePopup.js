import React from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isSaving, isOpen, onAddPlace, onClose }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  const submitButtonText = isSaving ? 'Сохранение...' : 'Создать';

  React.useEffect(() => {
    setName('');
    setLink('');
}, [isOpen]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeLink = (e) => {
    setLink(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="window"
      isOpen={isOpen ? "popup_opened" : ""}
      onClose={onClose}
      buttonText={submitButtonText}
      onSubmit={handleSubmit}
      isSaving={isSaving}
    >
      <input
        value={name}
        onChange={handleChangeName}
        className="popup__info"
        placeholder="Название"
        type="text"
        name="denomination"
        required
        minLength="2"
        maxLength="30"
      />
      <span className="denomination-error popup__input-error"></span>
      <input
        value={link}
        onChange={handleChangeLink}
        className="popup__info"
        placeholder="Ссылка на картинку"
        type="url"
        name="link"
        required
      />
      <span className="link-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;