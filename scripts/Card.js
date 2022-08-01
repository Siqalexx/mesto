class Card {
	constructor(image, title, openPhoto) {
		this._image = image;
		this._title = title;
		this._view = this._getTemplate();
		this._openPhoto = openPhoto;
	}

	_getTemplate() {
		return document
			.querySelector("#element-template")
			.content.children[0].cloneNode(true);
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
			.addEventListener("click", evt => {
				this._openPhoto(evt);
			});
	}

	_toggleLike() {
		this.classList.toggle("element__like_active");
	}

	_deleteElement() {
		this._view.remove();
	}

	render() {
		const elementLink = this._view.querySelector(".element__image");
		const elementTitle = this._view.querySelector(".element__title");
		elementLink.src = this._image;
		elementTitle.textContent = this._title;

		this._addEventListeners();

		return this._view;
	}
}

export default Card;
