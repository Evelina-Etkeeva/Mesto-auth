import negative from "./../images/reg-status-negative.svg";
import positive from "./../images/reg-status-positive.svg";

function InfoTooltip({isOpen, title, alt, res, onClose}) {
    return (
        <div
        className={isOpen ? "popup popup_active" : "popup"}
      >
        <div className="popup__forms-container">
          <button
            className="popup__close-btn button_type_close"
            type="button"
            onClick={onClose}
          ></button>
          <img className="popup__image-content" src={res ? positive : negative} alt={alt} />
          <p className="popup__message">{title}</p>
        </div>
      </div>
    )
  }
  
  export default InfoTooltip;