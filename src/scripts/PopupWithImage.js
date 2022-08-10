import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._popupNamePhoto = this._popup.querySelector(".popup__image-name");
		this._popupLinkPhoto = this._popup.querySelector(".popup__image");
	}
	open(image, title) {
		this._popupLinkPhoto.src = image;
		this._popupLinkPhoto.alt = title;
		this._popupNamePhoto.textContent = title;
		super.open();
	}
}
