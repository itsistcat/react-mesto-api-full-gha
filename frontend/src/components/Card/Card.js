import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Card(props) {
    const { card, handlePopup, handleCardLike } = props;
    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    const cardLikeButtonClassName = (
      `elements__like ${isLiked && 'elements__like_active'}`
    );
    return (
        <ul className="elements__list">
            <li className="elements__item">
                <img src={card.link} alt={`${card.name}`} className="elements__photo"
                    onClick={() => handlePopup.onCardClick(card)} />
                {isOwn &&<button aria-label="удаление" className="elements__delete"
                    type="button" onClick={() => handlePopup.onConfirmationCardDeletion(card)}/>}
                <div className="elements__description">
                    <h2 className="elements__title">{card.name}</h2>
                    <div className="elements__likes">
                        <button type="button" aria-label="лайк" className={cardLikeButtonClassName} onClick={() => handleCardLike.onCardLike(card)} />
                        {card.likes.length > 0 && <span className="elements__like-counter">{card.likes.length}</span>}
                    </div>
                </div>
            </li>
        </ul>

    )
}