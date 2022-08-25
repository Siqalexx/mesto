import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
	constructor(popupSelector, handleTodoSubmit) {
		super(popupSelector);
		this._handleTodoSubmit = handleTodoSubmit;
		this._array = Array.from(this._popup.querySelectorAll(".popup__input"));
		this._popupForm = this._popup.querySelector(".popup__form");
		this._listItem = {};
	}
	_getInputValues() {
		this._array.forEach(item => {
			this._listItem[item.name] = item.value;
		});
		return this._listItem;
	}

	renderLoading(isLoading, text) {
		if (isLoading) {
			this._popup.querySelector(".popup__submit").textContent = text;
		}
	}

	setEventListeners() {
		super.setEventListeners();

		this._popup.addEventListener("submit", evt => {
			const inputsList = this._getInputValues();
			this._handleTodoSubmit(evt, inputsList);
		});
	}
	close() {
		this._popupForm.reset();
		super.close();
	}
}
