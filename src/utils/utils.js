export const validationDict = {
    formSelector: '.form',
    inputSelector:  '.form__item',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_inactive',
    inputErrorClass: 'form__item-error',
    errorClass: 'form__error_active'
  }; //словарь для валидации форм

export const token = 'a81905a8-70e9-49b5-82c2-f5f8e94b1f23';
export const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-40'
export const headers = {
  'authorization': token,
  'Content-Type': 'application/json'
}
