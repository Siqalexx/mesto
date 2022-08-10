class FormValidator {
	constructor(obj, formElement) {
		this._obj = obj;
		this._formElement = formElement;
		this._inputList = Array.from(
			this._formElement.querySelectorAll(this._obj.inputSelector)
		);
		this._formButton = this._formElement.querySelector(
			this._obj.submitButtonSelector
		);
	}

	_formIsValid = () => {
		if (this._inputList.some(input => !input.validity.valid)) {
			return false;
		} else {
			return true;
		}
	};
	resetInputs = () => {
		const inputErrorList = Array.from(
			this._formElement.querySelectorAll(".popup__input-error")
		);
		this._inputList.forEach(input => {
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

	_toggleButtonState = () => {
		if (!this._formIsValid()) {
			this.doButtonInactive(); // !
		} else {
			this._formButton.classList.remove(this._obj.inactiveButtonClass);
			this._formButton.disabled = false;
		}
	};

	doButtonInactive = () => {
		this._formButton.classList.add(this._obj.inactiveButtonClass);
		this._formButton.disabled = true;
	};

	enableValidation() {
		this._toggleButtonState();
		this._inputList.forEach(inputElement => {
			inputElement.addEventListener("input", () => {
				this._checkInputValidity(inputElement);
				this._toggleButtonState();
			});
		});
	}
}

export default FormValidator;
