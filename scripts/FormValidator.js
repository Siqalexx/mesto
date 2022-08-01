class FormValidator {
	constructor(obj) {
		this._obj = obj;
	}

	_formIsValid = inputList => {
		if (inputList.some(input => !input.validity.valid)) {
			return false;
		} else {
			return true;
		}
	};

	_showError = (formElement, inputElement, errorMessage) => {
		const inputError = formElement.querySelector(`.${inputElement.name}-error`);
		inputElement.classList.add(this._obj.inputErrorClass);
		inputError.classList.add(this._obj.errorClass);
		inputError.textContent = errorMessage;
	};

	_hideError = (formElement, inputElement) => {
		const inputError = formElement.querySelector(`.${inputElement.name}-error`);
		inputElement.classList.remove(this._obj.inputErrorClass);
		inputError.classList.remove(this._obj.errorClass);
		inputError.textContent = "";
	};

	_checkInputValidity = (formElement, inputElement) => {
		if (!inputElement.validity.valid) {
			this._showError(
				formElement,
				inputElement,
				inputElement.validationMessage
			);
		} else {
			this._hideError(formElement, inputElement);
		}
	};

	_toggleButtonState = (inputList, formButton) => {
		if (!this._formIsValid(inputList)) {
			formButton.classList.add(this._obj.inactiveButtonClass);
			formButton.disabled = true;
		} else {
			formButton.classList.remove(this._obj.inactiveButtonClass);
			formButton.disabled = false;
		}
	};

	_inputValidation = formElement => {
		const inputList = Array.from(
			formElement.querySelectorAll(this._obj.inputSelector)
		);
		const formButton = formElement.querySelector(
			this._obj.submitButtonSelector
		);
		this._toggleButtonState(inputList, formButton);
		inputList.forEach(inputElement => {
			inputElement.addEventListener("input", () => {
				this._checkInputValidity(formElement, inputElement);
				this._toggleButtonState(inputList, formButton);
			});
		});
	};
	doButtonInactive = popup => {
		const formButton = popup.querySelector(this._obj.submitButtonSelector);
		formButton.classList.add(this._obj.inactiveButtonClass);
		formButton.disabled = true;
	};
	enableValidation() {
		const formList = Array.from(
			document.querySelectorAll(this._obj.formSelector)
		);
		formList.forEach(formElement => {
			this._inputValidation(formElement);
		});
	}
}

export default FormValidator;
