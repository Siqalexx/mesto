import Popup from "./Popup.js";
export default class PopupWithDelete extends Popup {
	constructor(popupSelector, handleRemoveCard) {
		super(popupSelector);
		this._handleRemoveCard = handleRemoveCard;
	}

	open(data, id) {
		super.open();
		this._data = data;
		this._id = id;
	}

	renderLoading(isLoading, text) {
		if (isLoading) {
			this._popup.querySelector(".popup__submit").textContent = text;
		}
	}

	setEventListeners() {
		super.setEventListeners();

		this._popup.addEventListener("submit", evt => {
			evt.preventDefault();
			this._handleRemoveCard(this._id, this._data);
		});
	}
}
