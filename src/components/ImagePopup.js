function ImagePopup(props) {
  return (
    <div
      className={`popup popup_content_image" ${
        props.card ? "popup_active" : ""
      }`}
    >
      {/* //if there is something in selectedCard, then it will be here in props.card */}
      <div className="popup__image-content">
        <img
          className="popup__img"
          src={props.card?.link}
          alt={props.card ? props.card.name : ""}
        />
        <span className="popup__title">
          {props.card ? props.card.name : ""}
        </span>
        <button
          type="button"
          aria-label="close"
          className="button button_type_close popup__close-btn"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
