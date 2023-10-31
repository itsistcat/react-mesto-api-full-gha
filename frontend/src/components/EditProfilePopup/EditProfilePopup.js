import { useState, useEffect, useContext } from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditProfilePopup(props) {
    const { onUpdateUser, isOpened, onClose, closePopupsOnOutsideClick } = props;
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (isOpened) {
            setName(currentUser.name);
            setDescription(currentUser.about);
          };
        }, [isOpened, currentUser]);

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateUser({
            name: name,
            about: description,
        });
        console.log(name)
    };

    return (
        <PopupWithForm popup={{
            classSelector: "edit-profile",
            classSelectorModifierForm: "popup__form_type_profile",
            formName: "profileEditor",
            title: "Редактировать профиль",
            submitBtn: "Сохранить"
        }}

            onSubmit={handleSubmit}
            isOpened={isOpened}
            onClose={onClose}
            closePopupsOnOutsideClick={closePopupsOnOutsideClick}
        >
            <fieldset className="popup__block">
                <div className="popup__input-element">
                    <input id="input-name" name="name" type="text" value={name || ''} onChange={handleChangeName}
                        placeholder="Имя" minLength="2" maxLength="40" required
                        className="popup__input popup__input_name" />
                    <span className="popup__input-error" id="nameInput-error" />
                </div>

                <div className="popup__input-element">
                    <input id="input-job" name="job" type="text" value={description || ''} onChange={handleChangeDescription}
                        placeholder="О себе" minLength="2" maxLength="200" required
                        className="popup__input popup__input_job" />
                    <span className="popup__input-error" id="jobInput-error" />
                </div>
            </fieldset>
        </PopupWithForm>
    );
};