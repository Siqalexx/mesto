class Card {
	constructor(
		image,
		title,
		likes,
		result,
		handleCardClick,
		handleCardDelete,
		api
	) {
		this._image = image;
		this._title = title;
		this._likes = likes;
		this._id = result._id;
		this._ownerId = result.owner._id;
		this._view = this._getTemplate();
		this._handleCardDelete = handleCardDelete;
		this._handleCardClick = handleCardClick;
		this._elementLike = this._view.querySelector(".element__like");
		this._api = api;
		this._likeCount = this._view.querySelector(".element__number");
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
				this._handleCardDelete(this._view, this._id);
			});

		this._elementLike.addEventListener("click", () => {
			if (this._elementLike.classList.contains("element__like_active")) {
				this._elementLike.classList.remove("element__like_active");
				this._api.RemoveLike(this._id).then(result => {
					this._likeCount.textContent = result.likes.length;
				});
			} else {
				this._elementLike.classList.add("element__like_active");
				this._api.SetLike(this._id).then(result => {
					this._likeCount.textContent = result.likes.length;
				});
			}
		});

		this._view
			.querySelector(".element__image")
			.addEventListener("click", () => {
				this._handleCardClick(this._image, this._title);
			});
	}

	createElement() {
		if (this._ownerId == "c4f7a47803fe570e1643fe00") {
			this._view
				.querySelector(".element__delete")
				.classList.add("element__delete_active");
		}
		this._likes.forEach(item => {
			if (item._id == "c4f7a47803fe570e1643fe00") {
				this._elementLike.classList.add("element__like_active");
			}
		});
		const elementLink = this._view.querySelector(".element__image");
		const elementTitle = this._view.querySelector(".element__title");
		this._likeCount.textContent = this._likes.length;
		elementLink.src = this._image;
		elementLink.alt = this._title;
		elementTitle.textContent = this._title;

		this._addEventListeners();

		return this._view;
	}
}

export default Card;
