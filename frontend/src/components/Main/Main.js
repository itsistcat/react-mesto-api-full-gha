// import { useEffect, useState } from "react";
// import { api } from "../../utils/Api.js";
import Card from "../Card/Card.js";
import { useContext } from "react";
//import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

export default function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">

      <section className="profile">
        <div className="profile__container-avatar">
          <img src={currentUser.avatar} alt="Аватарка" className="profile__avatar"
            onClick={props.onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button type="button" aria-label="редактировать"
            className="profile__edit-btn" onClick={props.onEditProfile} />
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button type="button" aria-label="добавить"
          className="profile__add-btn" onClick={props.onAddPlace} />
      </section>

      <section className="elements">
        {
          props.cards.map((card) => (
            <Card 
            key={card._id} 
            card={card} 
            handlePopup={props} 
            handleCardLike={props}
            handleCardDelete={props}
            />
          ))
        }
      </section>

    </main>
  );
}