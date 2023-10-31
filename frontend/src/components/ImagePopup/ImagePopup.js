import useClosePopupsOnKeyPressEsc from '../hooks/useClosePopupsOnKeyPressEsc'

export default function ImagePopup({ card, isImagePopupOpened, onClose, closePopupsOnOutsideClick }) {
    useClosePopupsOnKeyPressEsc(card.link, onClose);
    return (
        <div className={`popup popup_type_image 
        ${isImagePopupOpened && 'popup__opened'}`} 
        onClick={closePopupsOnOutsideClick}>
            <div className="popup__container-image">
                <button type="button" className="popup__close" onClick={onClose}></button>
                <img className="fullscreen" src={card.link} 
                alt={`Описание фотографии: ${card.name}`} />
                <p className="fullscreen-subtitle">{card.name}</p>
            </div>
        </div>
    )
}
