import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
	constructor(popupSelector, handleTodoSubmit) {
		super(popupSelector);
		this._handleTodoSubmit = handleTodoSubmit;
	}
	_getInputValues() {
		return Array.from(this._popup.querySelectorAll(".popup__input"));
	}
	setEventListeners() {
		super.setEventListeners();
		const inputsList = this._getInputValues();
		this._popup.addEventListener("submit", evt =>
			this._handleTodoSubmit(evt, inputsList)
		);
	}
	close() {
		this._popup.children[0].reset();
		super.close();
	}
}
