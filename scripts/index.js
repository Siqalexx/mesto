import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
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
};

const elements = document.querySelector(".elements"); //куда добавлять карточки
const popups = Array.from(document.querySelectorAll(".popup")); // попапы
const formAddedElement = document.querySelector(".popup__form_type_added"); //попап добавления
const formEditingElement = document.querySelector(".popup__form_type_editing"); //попап редактирования
const popupEditButton = document.querySelector(".profile__button-edit");
const popupAddButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popupProfile = document.querySelector(".popup_profile");
const nameEditInput = formEditingElement.querySelector(
	".popup__input_content_name"
);
const jobEditInput = formEditingElement.querySelector(
	".popup__input_content_job"
);
const popupCards = document.querySelector(".popup_cards");
const nameAddedInput = formAddedElement.querySelector(
	".popup__input_content_name"
);
const imageAddedInput = formAddedElement.querySelector(
	".popup__input_content_image"
);

const validitypopupAddButton = new FormValidator(obj, popupCards);
validitypopupAddButton.enableValidation();

const validitypopupEditButton = new FormValidator(obj, popupProfile);
validitypopupEditButton.enableValidation();

function resetForms(popup) {
	popup.reset();
}
const handleCardClick = (image, title) => {
	const popupPhoto = document.querySelector(".popup_photos");
	const popupNamePhoto = popupPhoto.querySelector(".popup__image-name");
	const popupLinkPhoto = popupPhoto.querySelector(".popup__image");
	popupLinkPhoto.src = image;
	popupLinkPhoto.alt = title;
	popupNamePhoto.textContent = title;
	openPopup(popupPhoto);
};
function createCard(link, name, handleCardClick) {
	const card = new Card(link, name, handleCardClick);
	return card.createElement();
}
initialCards.forEach(item => {
	//инициализация карточек
	const element = createCard(item.link, item.name, handleCardClick);
	elements.append(element);
});

function openPopup(popup) {
	document.addEventListener("keydown", closeByEscape);
	popup.classList.add("popup_opened");
}

function closePopup(popup) {
	//закрытие попапа
	popup.classList.remove("popup_opened");

	document.removeEventListener("keydown", closeByEscape);
}

function fillInInputsWithData() {
	nameEditInput.value = profileTitle.textContent;
	jobEditInput.value = profileSubtitle.textContent;
}

const handleTodoSubmit = e => {
	e.preventDefault();
	const nameElement = nameAddedInput.value;
	const imageElement = imageAddedInput.value;
	const cardElement = createCard(imageElement, nameElement, handleCardClick);
	elements.prepend(cardElement);
	closePopup(popupCards);
	resetForms(formAddedElement);
};
popupEditButton.addEventListener("click", () => {
	//doButtonInactive(popupProfile);

	validitypopupEditButton.resetInputs();
	validitypopupEditButton.doButtonInactive(popupProfile);
	openPopup(popupProfile);
	fillInInputsWithData();
});

popupAddButton.addEventListener("click", () => {
	validitypopupAddButton.resetInputs();
	validitypopupAddButton.doButtonInactive(popupCards);
	resetForms(formAddedElement);
	openPopup(popupCards);
});

function submitEditProfileForm(evt) {
	evt.preventDefault();
	profileTitle.textContent = nameEditInput.value;
	profileSubtitle.textContent = jobEditInput.value;
	closePopup(popupProfile);
}

formAddedElement.addEventListener("submit", handleTodoSubmit); //обработка сабмита
formEditingElement.addEventListener("submit", submitEditProfileForm); //обработка сабмита

window.addEventListener("load", removePreload); // функция для удаления меркания transition на движке гугл после прогрузки.

const closeByEscape = evt => {
	//закрытие через эскейп
	if (evt.key == "Escape") {
		const openedPopup = document.querySelector(".popup_opened");
		closePopup(openedPopup);
	}
};

popups.forEach(popup => {
	//добавляем обработчики
	popup.addEventListener("mousedown", evt => {
		if (
			evt.target.classList.contains("popup") ||
			evt.target.classList.contains("popup__exit")
		) {
			closePopup(popup);
		}
	});
});
