import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({ isSaving, onCardDelete, card, isOpen, onClose }) {
    const submitButton = isSaving ? 'Удаление...' : 'Да';

    function handleSubmit(e) {
        e.preventDefault();
        onCardDelete(card);
    }

    return (
        <PopupWithForm 
            title="Вы уверены?" 
            name="delete" 
            isOpen={isOpen} 
            onClose={onClose} 
            onSubmit={handleSubmit} 
            buttonText={submitButton}>
        </PopupWithForm>
    );
}

export default DeleteCardPopup;