const initialCards = [
	{
		name: "Архыз",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
	},
	{
		name: "Челябинская область",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
	},
	{
		name: "Иваново",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
	},
	{
		name: "Камчатка",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
	},
	{
		name: "Холмогорский район",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
	},
	{
		name: "Байкал",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
	},
];

const elementTemplate = document.querySelector("#element-template").content;
const elements = document.querySelector(".elements");
const popupCards = document.querySelector(".popup_cards");
const photoPopup = document.querySelector(".popup_photos");
const formAddedElement = document.querySelector(".popup__form_type_added");
const addPopup = document.querySelector(".profile__add-button");
const exitCardsPopup = formAddedElement.querySelector(".popup__exit");
const nameCards = formAddedElement.querySelector(".popup__input_content_name");
const imageCards = formAddedElement.querySelector(
	".popup__input_content_image"
);
const inputName = formAddedElement.querySelector(".popup__input_content_name");
const inputImage = formAddedElement.querySelector(
	".popup__input_content_image"
);

const GetByEvent = e => {
	return e.currentTarget.closest(".element");
};
const addLike = e => {
	const element = GetByEvent(e);
	const elementByAddLike = element.querySelector(".element__like");
	elementByAddLike.classList.toggle("element__like_active");
};
const removeElement = e => {
	const element = GetByEvent(e);
	element.remove();
};
const openPhoto = e => {
	const element = GetByEvent(e);
	photoPopup.querySelector(".popup__image").src =
		element.querySelector(".element__image").src;
	photoPopup.querySelector(".popup__image-name").textContent =
		element.querySelector(".element__title").textContent;
	photoPopup
		.querySelector(".popup__exit")
		.addEventListener("click", () => closePopup(photoPopup));
	openPopup(photoPopup);
};

const eventListener = element => {
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
	eventListener(element);
	return element;
};

const AddedElement = obj => {
	elements.append(createElement(obj.name, obj.link));
};

initialCards.forEach(AddedElement);

function openPopup(popup) {
	popup.classList.add("popup_opened");
}

function closePopup(popup) {
	popup.classList.remove("popup_opened");
}

const handleTodoSubmit = e => {
	e.preventDefault();
	const nameElement = inputName.value;
	const imageElement = inputImage.value;
	elements.prepend(createElement(nameElement, imageElement));
	closePopup(popupCards);
	formAddedElement.reset();
};

addPopup.addEventListener("click", () => openPopup(popupCards));
exitCardsPopup.addEventListener("click", () => closePopup(popupCards));
formAddedElement.addEventListener("submit", handleTodoSubmit);
