import useClosePopupsOnKeyPressEsc from '../hooks/useClosePopupsOnKeyPressEsc';
import { useContext } from 'react';

import { ProcessLoadingSpinnerContext } from '../../contexts/ProcessLoadingSpinnerContext';

export default function PopupWithForm({ popup, ...props }) {
    const isProcessLoading = useContext(ProcessLoadingSpinnerContext);
    useClosePopupsOnKeyPressEsc(props.isOpened, props.onClose);
    function handleBtnText() {
        if (!isProcessLoading) {
          return popup.submitBtn;
        };
    
        return popup.submitBtnLoading ? popup.submitBtnLoading : 'Сохранение...';
      };

    return (
        <div className={`popup popup_type_${popup.classSelector} ${props.isOpened && 'popup__opened'}`} 
        onClick={props.closePopupsOnOutsideClick}>
            <div className="popup__container">
                <h2 className="popup__title">{popup.title}</h2>
                <button aria-label="закрыть" className="popup__close" type="button" 
                onClick={props.onClose} />
                <form name={popup.formName} className={`popup__form ${popup.classSelectorModifierForm}`}
                onSubmit={props.onSubmit}>
                    {props.children}
                    <button aria-label="сохранить" className={`popup__save ${popup.classSelectorModifierSubmitBtn}`}>{handleBtnText()}</button>
                </form>
            </div>
        </div>
    );
}