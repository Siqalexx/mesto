import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
	constructor(popupSelector, handleTodoSubmit) {
		super(popupSelector);
		this._handleTodoSubmit = handleTodoSubmit;
		this._array = Array.from(this._popup.querySelectorAll(".popup__input"));
		this._update = this._popup.children[0];
		this._listItem = {};
	}
	_getInputValues() {
		this._array.forEach(item => {
			this._listItem[item.name] = item.value;
		});
		return this._listItem;
	} //можете пожалуйста еще сказать, как можно лучше сделать все это, чтобы не было костыльных решений, а то мне кажется, что я делаю все очень странно
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
