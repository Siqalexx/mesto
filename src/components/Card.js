class Card {
	constructor(
		image,
		title,
		likes,
		resultInfo,
		myId,
		handleCardClick,
		handleCardDelete,
		handleApiRemoveLike,
		handleApiSetLike
	) {
		this._image = image;
		this._title = title;
		this._likes = likes;
		this._myId = myId;
		this._idCard = resultInfo._id;
		this._ownerId = resultInfo.owner._id;
		this._view = this._getTemplate();
		this._handleCardDelete = handleCardDelete;
		this._handleCardClick = handleCardClick;
		this._elementLike = this._view.querySelector(".element__like");
		this._handleApiRemoveLike = handleApiRemoveLike;
		this._handleApiSetLike = handleApiSetLike;
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
				this._handleCardDelete(this._view, this._idCard);
			});

		this._elementLike.addEventListener("click", () => {
			if (this._elementLike.classList.contains("element__like_active")) {
				this._handleApiRemoveLike(
					this._idCard,
					this._likeCount,
					this._elementLike
				);
			} else {
				this._handleApiSetLike(
					this._idCard,
					this._likeCount,
					this._elementLike
				);
			}
		});

		this._view
			.querySelector(".element__image")
			.addEventListener("click", () => {
				this._handleCardClick(this._image, this._title);
			});
	}
	deleteElement(data) {
		data.remove();
		data = null;
	}
	createElement() {
		if (this._ownerId == this._myId) {
			this._view
				.querySelector(".element__delete")
				.classList.add("element__delete_active");
		}
		this._likes.forEach(item => {
			if (item._id == this._myId) {
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
