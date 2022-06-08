const popupProfile = document.querySelector(".popup_profile");
const formEditingElement = document.querySelector(".popup__form_type_editing");
const nameInput = document.querySelector(".profile__title");
const jobInput = document.querySelector(".profile__subtitle");
const editPopup = document.querySelector(".profile__button-edit");
const exitPopup = formEditingElement.querySelector(".popup__exit");
const namePopup = formEditingElement.querySelector(
	".popup__input_content_name"
);
const jobPopup = formEditingElement.querySelector(".popup__input_content_job");

const elementTemplate = document.querySelector("#element-template").content;
const elements = document.querySelector(".elements");
const popupCards = document.querySelector(".popup_cards");
const photoPopup = document.querySelector(".popup_photos");
photoPopup
	.querySelector(".popup__exit")
	.addEventListener("click", () => closePopup(photoPopup));
const formAddedElement = document.querySelector(".popup__form_type_added");
const addPopup = document.querySelector(".profile__add-button");
const exitCardsPopup = formAddedElement.querySelector(".popup__exit");
const nameCards = formAddedElement.querySelector(".popup__input_content_name");
const imageCards = formAddedElement.querySelector(
	".popup__input_content_image"
);
const imageName = photoPopup.querySelector(".popup__image-name");
const imagePopup = photoPopup.querySelector(".popup__image");
const inputName = formAddedElement.querySelector(".popup__input_content_name");
const inputImage = formAddedElement.querySelector(
	".popup__input_content_image"
);

const nameElement = inputName.value;
const imageElement = inputImage.value;
const getElementByEvent = e => {
	return e.currentTarget.closest(".element");
};
const addLike = e => {
	const element = getElementByEvent(e);
	const elementByAddLike = element.querySelector(".element__like");
	elementByAddLike.classList.toggle("element__like_active");
};
const removeElement = e => {
	const element = getElementByEvent(e);
	element.remove();
};
const openPhoto = e => {
	const element = getElementByEvent(e);
	imagePopup.src = element.querySelector(".element__image").src;
	imageName.textContent = element.querySelector(".element__title").textContent;
	openPopup(photoPopup);
};

const setCardEventListeners = element => {
	element.querySelector(".element__like").addEventListener("click", addLike);
	element
		.querySelector(".element__delete")
		.addEventListener("click", removeElement);
	element.querySelector(".element__image").addEventListener("click", openPhoto);
};
const createElement = (name, image) => {
	const element = elementTemplate.querySelector(".element").cloneNode(true);
	element.querySelector(".element__image").src = image;
	element.querySelector(".element__title").textContent = name;
	setCardEventListeners(element);
	return element;
};

const addCard = obj => {
	elements.append(createElement(obj.name, obj.link));
};

const handleTodoSubmit = e => {
	e.preventDefault();
	elements.prepend(createElement(nameElement, imageElement));
	closePopup(popupCards);
	formAddedElement.reset();
};

initialCards.forEach(addCard);

function openPopup(popup) {
	popup.classList.add("popup_opened");
}

function closePopup(popup) {
	popup.classList.remove("popup_opened");
}

function submitEditProfileForm(evt) {
	evt.preventDefault();
	nameInput.textContent = namePopup.value;
	jobInput.textContent = jobPopup.value;
	closePopup(popupProfile);
}

function fillInInputsWithData() {
	namePopup.value = nameInput.textContent;
	jobPopup.value = jobInput.textContent;
}

exitPopup.addEventListener("click", () => {
	closePopup(popupProfile);
});
formEditingElement.addEventListener("submit", submitEditProfileForm);
editPopup.addEventListener("click", () => {
	openPopup(popupProfile);
	fillInInputsWithData();
});
addPopup.addEventListener("click", () => openPopup(popupCards));
exitCardsPopup.addEventListener("click", () => closePopup(popupCards));
formAddedElement.addEventListener("submit", handleTodoSubmit);
