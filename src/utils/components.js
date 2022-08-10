export {
	obj,
	elements,
	popupEditButton,
	popupAddButton,
	popupProfile,
	popupCards,
	nameEditInput,
	jobEditInput,
	removePreload,
	initialCards,
};

const obj = {
	formSelector: ".popup__form",
	inputSelector: ".popup__input",
	submitButtonSelector: ".popup__submit",
	inactiveButtonClass: "popup__button_disabled",
	inputErrorClass: "popup__input_type_error",
	errorClass: "popup__input-error_visible",
	formEditingElement: ".popup__form_type_editing",
	nameEditInput: ".popup__input_content_name",
	jobEditInput: ".popup__input_content_job",
};

const elements = document.querySelector(".elements"); //куда добавлять карточки
const popupEditButton = document.querySelector(".profile__button-edit");
const popupAddButton = document.querySelector(".profile__add-button");
const popupProfile = document.querySelector(".popup_profile");
const popupCards = document.querySelector(".popup_cards");
const formEditingElement = document.querySelector(obj.formEditingElement);
const nameEditInput = formEditingElement.querySelector(obj.nameEditInput);
const jobEditInput = formEditingElement.querySelector(obj.jobEditInput);

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

const removePreload = () => {
	const bodyPreload = document.querySelector(".body");
	bodyPreload.classList.remove("preload");
};
