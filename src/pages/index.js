import "./index.css";
import Section from "../scripts/Section.js";
import FormValidator from "../scripts/FormValidator.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import Card from "../scripts/Card.js";
import {
	obj,
	elements,
	popupEditButton,
	popupAddButton,
	popupProfile,
	popupCards,
	nameEditInput,
	jobEditInput,
	initialCards,
	removePreload,
} from "../utils/components.js";

const validityPopupAddButton = new FormValidator(obj, popupCards);
validityPopupAddButton.enableValidation();

const validityPopupEditButton = new FormValidator(obj, popupProfile);
validityPopupEditButton.enableValidation();

const sectionDrawPhoto = new Section(
	{
		items: initialCards,
		renderer: item => {
			const element = createCard(item.name, item.link, handleCardClick);
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

function setFieldProfile(userInfo) {
	nameEditInput.value = userInfo.newNameEditProfile;
	jobEditInput.value = userInfo.newJobEditProfile;
}

function handleTodoSubmit(evt, inputsList) {
	evt.preventDefault();
	const cardElement = createCard(
		inputsList["input-title"],
		inputsList["input-image"]
	);
	sectionDrawPhoto.addItem(cardElement);
	formAdded.close();
}

function submitEditProfileForm(evt, inputsList) {
	evt.preventDefault();
	profileInfo.setUserInfo({
		newNameEditProfile: inputsList["input-name"],
		newJobEditProfile: inputsList["input-job"],
	});
	formEdit.close();
}

function createCard(name, link) {
	const card = new Card(link, name, handleCardClick);
	return card.createElement();
}

function handleCardClick(image, title) {
	photoPopup.open(image, title);
}
popupEditButton.addEventListener("click", () => {
	validityPopupEditButton.resetInputs();
	validityPopupEditButton.doButtonInactive();
	formEdit.open();
	const userInfo = profileInfo.getUserInfo();
	setFieldProfile(userInfo);
});

popupAddButton.addEventListener("click", () => {
	validityPopupAddButton.resetInputs();
	validityPopupAddButton.doButtonInactive(popupCards);
	formAdded.open();
});

window.addEventListener("load", removePreload); // функция для удаления меркания transition на движке гугл после прогрузки.
