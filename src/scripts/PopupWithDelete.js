import Popup from "./Popup.js";
export default class PopupWithDelete extends Popup {
	constructor(popupSelector, removeCard) {
		super(popupSelector);
		this._removeCard = removeCard;
	}

	open(data, id) {
		super.open();
		this._data = data;
		this._id = id;
		console.log(this._id);
	}

	setEventListeners() {
		super.setEventListeners();

		this._popup.addEventListener("submit", evt => {
			evt.preventDefault();
			this.deleteElement();
			this.close();
			this._removeCard(this._id);
		});
	}
	deleteElement() {
		this._data.remove();
		this._data = null;
	}
}
