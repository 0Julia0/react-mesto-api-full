import React from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onUpdateAvatar, onClose, isSaving }) {
  const avatarRef = React.useRef();
  const submitButton = isSaving ? 'Сохранение...' : 'Обновить';

  React.useEffect(() => {
    avatarRef.current.value = '';
}, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen ? "popup_opened" : ""}
      onClose={onClose}
      buttonText={submitButton}
      onSubmit={handleSubmit}
      isSaving={isSaving}
    >
      <input
        ref={avatarRef}
        className="popup__info"
        placeholder="Новый аватар"
        type="url"
        name="avatar"
        required
      />
      <span className="avatar-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;