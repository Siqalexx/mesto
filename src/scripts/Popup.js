export default class Popup {
	constructor(popupSelector) {
		this._popup = document.querySelector(popupSelector);
		this._handleEscClose = this._handleEscClose.bind(this);
	}

	open() {
		document.addEventListener("keydown", this._handleEscClose);
		this._popup.classList.add("popup_opened");
	}

	close() {
		this._popup.classList.remove("popup_opened");
		document.removeEventListener("keydown", this._handleEscClose);
	}

	renderLoading(isLoading, text) {
		if (isLoading) {
			this._popup.querySelector(".popup__submit").textContent = text;
		}
	}

	_handleEscClose(evt) {
		if (evt.key == "Escape") {
			this.close();
		}
	}

	setEventListeners() {
		this._popup.addEventListener("mousedown", evt => {
			if (
				evt.target.classList.contains("popup") ||
				evt.target.classList.contains("popup__exit")
			) {
				this.close();
			}
		});
	}
}
