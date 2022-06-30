import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onSubmit([name, link]);
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="form__item form__item_el_place-name"
        id="place-name"
        name="place-name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={name || ""}
        onChange={handleNameChange}
      />
      <span className="place-name-error form__span"></span>
      <input
        type="url"
        className="form__item form__item_el_place-img"
        id="place-img"
        name="place-img"
        placeholder="Ссылка на картинку"
        required
        value={link || ""}
        onChange={handleLinkChange}
      />
      <span className="place-img-error form__span"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
