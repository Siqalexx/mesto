class Card {
	constructor(image, title, handleCardClick) {
		this._image = image;
		this._title = title;
		this._view = this._getTemplate();
		this._handleCardClick = handleCardClick;
	}

	_getTemplate() {
		return document
			.querySelector("#element-template")
			.content.querySelector(".element")
			.cloneNode(true);
	}

	_addEventListeners() {
		this._view
			.querySelector(".element__delete")
			.addEventListener("click", () => {
				this._deleteElement();
			});
		this._view
			.querySelector(".element__like")
			.addEventListener("click", this._toggleLike);

		this._view
			.querySelector(".element__image")
			.addEventListener("click", () => {
				this._handleCardClick(this._image, this._title);
			});
	}

	_toggleLike() {
		this.classList.toggle("element__like_active");
	}

	_deleteElement() {
		this._view.remove();
		this._view = null;
	}

	createElement() {
		const elementLink = this._view.querySelector(".element__image");
		const elementTitle = this._view.querySelector(".element__title");
		elementLink.src = this._image;
		elementLink.alt = this._title;
		elementTitle.textContent = this._title;

		this._addEventListeners();

		return this._view;
	}
}

export default Card;
