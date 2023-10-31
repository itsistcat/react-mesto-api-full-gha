import PopupWithForm from "../PopupWithForm/PopupWithForm"

export default function ConfirmCardDeletionPopup(props) {
  const { activeCardId, onCardDelete, isOpened, onClose, closePopupsOnOutsideClick } = props;

  function handleSubmit(evt) {
    evt.preventDefault();
    onCardDelete(activeCardId);
  }

  return (
    <PopupWithForm popup={{
      classSelector: "delete-place",
      classSelectorModifierForm: "popup__form_type_confirmation-deletion",
      formName: "photocardDeletion",
      classSelectorModifierSubmitBtn: "popup__submit-button_type_confirmation-deletion",
      title: "Вы уверены?",
      submitBtn: "Да",
      submitBtnLoading: "Удаление..."
    }}
      onSubmit={handleSubmit}
      isOpened={isOpened}
      onClose={onClose}
      closePopupsOnOutsideClick={closePopupsOnOutsideClick}
    />
  );
};