import { useState, useEffect, useContext, useRef } from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup(props) {
    const { onUpdateAvatar, isOpened, onClose, closePopupsOnOutsideClick } = props;

    const currentUser = useContext(CurrentUserContext);
    const [avatar, setAvatar] = useState('');
    const avatarRef = useRef(avatar);

    useEffect(() => {
        setAvatar(currentUser.avatar);
    }, [currentUser]);

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    };

    useEffect(() => {
        if (isOpened) {
          avatarRef.current.value = '';
        };
      }, [isOpened, avatarRef]);

    return (
        <PopupWithForm popup={{
            classSelector: "edit-avatar",
            classSelectorModifierForm: "popup__form_type_avatar",
            formName: "avatarEditor",
            title: "Обновить аватар",
            submitBtn: "Сохранить"
        }}
        onSubmit={handleSubmit}
            isOpened={isOpened}
            onClose={onClose}
            closePopupsOnOutsideClick={closePopupsOnOutsideClick}
        >
            <fieldset className="popup__block">
                <div className="popup__input-element">
                    <input id="avatar-url" name="profileAvatar" type="url" placeholder="Ссылка на изображение" defaultValue="" required
                        className="popup__input popup__input_avatar" ref={avatarRef} />
                    <span className="popup__input-error" id="typeAva-error" />
                </div>
            </fieldset>
        </PopupWithForm>
    );
};
