class FormValidator {
	constructor(obj, formElement) {
		this._obj = obj;
		this._formElement = formElement;
	}

	_formIsValid = inputList => {
		if (inputList.some(input => !input.validity.valid)) {
			return false;
		} else {
			return true;
		}
	};
	resetInputs = () => {
		const inputErrorList = Array.from(
			this._formElement.querySelectorAll(".popup__input-error")
		);
		const inputList = Array.from(
			this._formElement.querySelectorAll(this._obj.inputSelector)
		);
		inputList.forEach(input => {
			input.classList.remove(this._obj.inputErrorClass);
		});
		inputErrorList.forEach(inputError => {
			inputError.textContent = "";
			inputError.classList.remove(this._obj.errorClass);
		});
	};
	_showError = (inputElement, errorMessage) => {
		const inputError = this._formElement.querySelector(
			`.${inputElement.name}-error`
		);
		inputElement.classList.add(this._obj.inputErrorClass);
		inputError.classList.add(this._obj.errorClass);
		inputError.textContent = errorMessage;
	};

	_hideError = inputElement => {
		const inputError = this._formElement.querySelector(
			`.${inputElement.name}-error`
		);
		inputElement.classList.remove(this._obj.inputErrorClass);
		inputError.classList.remove(this._obj.errorClass);
		inputError.textContent = "";
	};

	_checkInputValidity = inputElement => {
		if (!inputElement.validity.valid) {
			this._showError(inputElement, inputElement.validationMessage);
		} else {
			this._hideError(inputElement);
		}
	};
	_terminationbutton(formButton) {
		formButton.classList.add(this._obj.inactiveButtonClass);
		formButton.disabled = true;
	}
	_toggleButtonState = (inputList, formButton) => {
		if (!this._formIsValid(inputList)) {
			this._terminationbutton(formButton);
		} else {
			formButton.classList.remove(this._obj.inactiveButtonClass);
			formButton.disabled = false;
		}
	};

	doButtonInactive = () => {
		const formButton = this._formElement.querySelector(
			this._obj.submitButtonSelector
		);
		this._terminationbutton(formButton);
	};

	enableValidation() {
		const inputList = Array.from(
			this._formElement.querySelectorAll(this._obj.inputSelector)
		);
		const formButton = this._formElement.querySelector(
			this._obj.submitButtonSelector
		);
		this._toggleButtonState(inputList, formButton);
		inputList.forEach(inputElement => {
			inputElement.addEventListener("input", () => {
				this._checkInputValidity(inputElement);
				this._toggleButtonState(inputList, formButton);
			});
		});
	}
}

export default FormValidator;
