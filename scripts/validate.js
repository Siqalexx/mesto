const obj = {
	formSelector: ".popup__form",
	inputSelector: ".popup__input",
	submitButtonSelector: ".popup__submit",
	inactiveButtonClass: "popup__button_disabled",
	inputErrorClass: "popup__input_type_error",
	errorClass: "popup__input-error_visible",
};
const showError = (obj, formElement, inputElement, errorMessage) => {
	const inputError = formElement.querySelector(`.${inputElement.name}-error`);
	inputElement.classList.add(obj.inputErrorClass);
	inputError.classList.add(obj.errorClass);
	inputError.textContent = errorMessage;
};

const hideError = (obj, formElement, inputElement) => {
	const inputError = formElement.querySelector(`.${inputElement.name}-error`);
	inputElement.classList.remove(obj.inputErrorClass);
	inputError.classList.remove(obj.errorClass);
	inputError.textContent = "";
};

const checkInputValidity = (obj, formElement, inputElement) => {
	if (!inputElement.validity.valid) {
		showError(obj, formElement, inputElement, inputElement.validationMessage);
	} else {
		hideError(obj, formElement, inputElement);
	}
};
const inputValidation = (obj, formElement) => {
	const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
	const formButton = formElement.querySelector(obj.submitButtonSelector);
	toggleButtonState(obj, inputList, formButton);
	inputList.forEach(inputElement => {
		inputElement.addEventListener("input", () => {
			checkInputValidity(obj, formElement, inputElement);
			toggleButtonState(obj, inputList, formButton);
		});
	});
};
const toggleButtonState = (obj, inputList, formButton) => {
	if (!formIsValid(inputList)) {
		formButton.classList.add(obj.inactiveButtonClass);
	} else {
		formButton.classList.remove(obj.inactiveButtonClass);
	}
};
const formIsValid = inputList => {
	if (inputList.some(input => !input.validity.valid)) {
		return false;
	} else {
		return true;
	}
};
const enableValidation = obj => {
	const formList = Array.from(document.querySelectorAll(obj.formSelector));
	formList.forEach(formElement => {
		inputValidation(obj, formElement);
	});
};
enableValidation(obj);
