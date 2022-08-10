import "./../pages/index.css";
import Card from "./Card.js";
import Section from "./Section.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import initialCards from "./initial-cards.js";
const removePreload = () => {
	const bodyPreload = document.querySelector(".body");
	bodyPreload.classList.remove("preload");
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

const validityPopupAddButton = new FormValidator(obj, popupCards);
validityPopupAddButton.enableValidation();

const validityPopupEditButton = new FormValidator(obj, popupProfile);
validityPopupEditButton.enableValidation();

const sectionDrawPhoto = new Section(
	{
		items: initialCards,
		renderer: item => {
			const element = createCard(item.link, item.name, handleCardClick);
			elements.append(element);
		},
	},
	elements
);
sectionDrawPhoto.renderItems();

const formAdded = new PopupWithForm(".popup_cards", handleTodoSubmit);
formAdded.setEventListeners();

const formEdit = new PopupWithForm(".popup_profile", submitEditProfileForm);
formEdit.setEventListeners();

const photoPopup = new PopupWithImage(".popup_photos");
photoPopup.setEventListeners();

const profileInfo = new UserInfo(
	{
		nameEditProfile: ".profile__title",
		jobEditProfile: ".profile__subtitle",
	},
	obj
);

function handleCardClick(image, title) {
	photoPopup.open(image, title);
}

function setFieldProfile(userInfo) {
	nameEditInput.value = userInfo.newNameEditProfile;
	jobEditInput.value = userInfo.newJobEditProfile;
}

function createCard(link, name) {
	const card = new Card(link, name, handleCardClick);
	return card.createElement();
}

popupEditButton.addEventListener("click", () => {
	validityPopupEditButton.resetInputs();
	validityPopupEditButton.doButtonInactive(popupProfile);
	formEdit.open();
	const userInfo = profileInfo.getUserInfo();
	setFieldProfile(userInfo);
});

popupAddButton.addEventListener("click", () => {
	validityPopupAddButton.resetInputs();
	validityPopupAddButton.doButtonInactive(popupCards);
	formAdded.open();
});

function handleTodoSubmit(evt, inputsList) {
	evt.preventDefault();
	const cardElement = createCard(
		inputsList[1].value,
		inputsList[0].value,
		handleCardClick
	);
	sectionDrawPhoto.addItem(cardElement);
	formAdded.close();
}

function submitEditProfileForm(evt, inputsList) {
	evt.preventDefault();
	profileInfo.setUserInfo({
		newNameEditProfile: inputsList[0].value,
		newJobEditProfile: inputsList[1].value,
	});
	formEdit.close();
}

window.addEventListener("load", removePreload); // функция для удаления меркания transition на движке гугл после прогрузки.
