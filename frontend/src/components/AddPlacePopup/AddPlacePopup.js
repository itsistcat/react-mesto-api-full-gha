import { useEffect, useState } from "react";

import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup(props) {
    const { onAddPlace, isOpened, onClose, closePopupsOnOutsideClick } = props;
    
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleNewCardName(evt) {
        setName(evt.target.value);
    };

    function handleNewCardLink(evt) {
        setLink(evt.target.value);
    };

    function handleSubmit(evt) {
        evt.preventDefault();

        onAddPlace({
            name: name,
            link: link
        });
    };
    
    useEffect(() => {
        if (isOpened) {
          setName('');
          setLink('');
        };
      }, [isOpened]);

    return (
        <PopupWithForm popup={{
            classSelector: "add-place",
            //classSelectorModifierForm: "popup__form_type_photocards",
            formName: "placeAdding",
            title: "Новое место",
            submitBtn: "Создать",
        }}
            onSubmit={handleSubmit}
            isOpened={isOpened}
            onClose={onClose}
            closePopupsOnOutsideClick={closePopupsOnOutsideClick}
        >
            <fieldset className="popup__block">
                <div className="popup__input-element">
                    <input name="name" type="text" placeholder="Название" 
                    value={name} onChange={handleNewCardName} maxLength="30" required
                        className="popup__input popup__input_place" />
                    <span className="popup__input-error" id="typePlace-error" />
                </div>
                <div className="popup__input-element">
                    <input name="link" type="url" id="typeUrl" placeholder="Ссылка на изображение" 
                    value={link} onChange={handleNewCardLink} required
                        className="popup__input popup__input_url" />
                    <span className="popup__input-error" id="typeUrl-error" />
                </div>
            </fieldset>
        </PopupWithForm>
    )
} 