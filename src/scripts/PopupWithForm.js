import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
	constructor(popupSelector, handleTodoSubmit) {
		super(popupSelector);
		this._handleTodoSubmit = handleTodoSubmit;
		this._array = Array.from(this._popup.querySelectorAll(".popup__input"));
		this._update = this._popup.children[0];
	}
	_getInputValues() {
		return {
			firstInput: this._array[1].value,
			secondInput: this._array[0].value,
		};
	}
	setEventListeners() {
		super.setEventListeners();

		this._popup.addEventListener("submit", evt => {
			const inputsList = this._getInputValues();
			this._handleTodoSubmit(evt, inputsList);
		});
	}
	close() {
		this._update.reset();
		super.close();
	}
}
