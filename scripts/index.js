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
const PopupEditButton = document.querySelector(".profile__button-edit");
const PopupAddButton = document.querySelector(".profile__add-button");
const ProfileTitle = document.querySelector(".profile__title");
const ProfileSubtitle = document.querySelector(".profile__subtitle");
const popupProfile = document.querySelector(".popup_profile");
const NameEditInput = formEditingElement.querySelector(
	".popup__input_content_name"
);
const JobEditInput = formEditingElement.querySelector(
	".popup__input_content_job"
);
const popupCards = document.querySelector(".popup_cards");
const NameAddedInput = formAddedElement.querySelector(
	".popup__input_content_name"
);
const ImageAddedInput = formAddedElement.querySelector(
	".popup__input_content_image"
);

function resetForms(popup) {
	popup.reset();
}
function createCard(link, name, openPopup) {
	return new Card(link, name, openPopup);
}
initialCards.forEach(item => {
	//инициализация карточек
	const card = createCard(item.link, item.name, openPopup);
	elements.append(card.render());
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
	NameEditInput.value = ProfileTitle.textContent;
	JobEditInput.value = ProfileSubtitle.textContent;
}

const handleTodoSubmit = e => {
	e.preventDefault();
	let nameElement = NameAddedInput.value;
	let imageElement = ImageAddedInput.value;
	const cardElement = createCard(imageElement, nameElement, openPopup);
	elements.prepend(cardElement.render());
	closePopup(popupCards);
	resetForms(formAddedElement);
};

PopupEditButton.addEventListener("click", () => {
	//doButtonInactive(popupProfile);
	const validityPopupEditButton = new FormValidator(obj, popupProfile);
	validityPopupEditButton.enableValidation();
	validityPopupEditButton.resetInputs();
	validityPopupEditButton.doButtonInactive(popupProfile);
	openPopup(popupProfile);
	fillInInputsWithData();
});

PopupAddButton.addEventListener("click", () => {
	const validityPopupAddButton = new FormValidator(obj, popupCards);
	validityPopupAddButton.enableValidation();
	validityPopupAddButton.resetInputs();
	validityPopupAddButton.doButtonInactive(popupCards);
	resetForms(formAddedElement);
	openPopup(popupCards);
});

function submitEditProfileForm(evt) {
	evt.preventDefault();
	ProfileTitle.textContent = NameEditInput.value;
	ProfileSubtitle.textContent = JobEditInput.value;
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
