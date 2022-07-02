function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_content_${props.name} ${
        props.isOpen && "popup_active"
      }`}
    >
      <div className="popup__forms-container">
        <button
          type="button"
          aria-label="close"
          className="button button_type_close popup__close-btn"
          onClick={props.onClose}
        />
        <form
          className="form form_content_add-card"
          name={props.name}
          noValidate
          onSubmit={props.onSubmit}
        >
          <h2 className="form__header">{props.title}</h2>
          {props.children}
          <button
            type="submit"
            className="button button_type_save popup__save-btn"
            value="Сохранить"
          >
            {props.buttonText ? props.buttonText : "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
