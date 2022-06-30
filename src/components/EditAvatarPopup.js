import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarValue = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onSubmit({
      avatar_img:
        avatarValue.current
          .value /* Значение инпута, полученное с помощью рефа */,
    });
  }
  React.useEffect(() => {
    avatarValue.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Обновить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarValue}
        type="url"
        className="form__item form__item_el_avatar-img"
        id="avatar_img"
        name="avatar_img"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="avatar-img-error form__span"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
