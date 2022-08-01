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
const validity = new FormValidator(obj);
validity.enableValidation();
const elements = document.querySelector(".elements"); //куда добавлять карточки
const popups = Array.from(document.querySelectorAll(".popup")); // попапы
const formAddedElement = document.querySelector(".popup__form_type_added"); //попап добавления
const formEditingElement = document.querySelector(".popup__form_type_editing"); //попап редактирования
const editPopup = document.querySelector(".profile__button-edit");
const addPopup = document.querySelector(".profile__add-button");
const nameInput = document.querySelector(".profile__title");
const jobInput = document.querySelector(".profile__subtitle");
const popupProfile = document.querySelector(".popup_profile");
const namePopup = formEditingElement.querySelector(
	".popup__input_content_name"
);
const jobPopup = formEditingElement.querySelector(".popup__input_content_job");
const popupCards = document.querySelector(".popup_cards");
const inputName = formAddedElement.querySelector(".popup__input_content_name");
const inputImage = formAddedElement.querySelector(
	".popup__input_content_image"
);
const photoPopup = document.querySelector(".popup_photos");
const imageName = photoPopup.querySelector(".popup__image-name");
const imagePopup = photoPopup.querySelector(".popup__image");
let nameElement;
let imageElement;

function resetForms(popup) {
	popup.reset();
}
const _openPhoto = e => {
	const element = getElementByEvent(e);
	imagePopup.src = element.querySelector(".element__image").src;
	imagePopup.alt = element.querySelector(".element__title").textContent;
	imageName.textContent = element.querySelector(".element__title").textContent;
	openPopup(photoPopup);
};

const getElementByEvent = e => {
	return e.currentTarget.closest(".element");
};

initialCards.forEach(item => {
	//инициализация карточек
	const card = new Card(item.link, item.name, _openPhoto);
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
	namePopup.value = nameInput.textContent;
	jobPopup.value = jobInput.textContent;
}

const handleTodoSubmit = e => {
	e.preventDefault();
	nameElement = inputName.value;
	imageElement = inputImage.value;
	const cardElement = new Card(imageElement, nameElement, _openPhoto);
	elements.prepend(cardElement.render());
	closePopup(popupCards);
	resetForms(formAddedElement);
};

const resetInputs = formElement => {
	const inputErrorList = Array.from(
		formElement.querySelectorAll(".popup__input-error")
	);
	const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
	inputList.forEach(input => {
		input.classList.remove(obj.inputErrorClass);
	});
	inputErrorList.forEach(inputError => {
		inputError.textContent = "";
		inputError.classList.remove(obj.errorClass);
	});
};

editPopup.addEventListener("click", () => {
	//doButtonInactive(popupProfile);
	resetInputs(formEditingElement);
	validity.doButtonInactive(popupProfile);
	openPopup(popupProfile);
	fillInInputsWithData();
});

addPopup.addEventListener("click", () => {
	//doButtonInactive(popupCards);
	resetInputs(formAddedElement);
	validity.doButtonInactive(popupCards);
	resetForms(formAddedElement);
	openPopup(popupCards);
});

function submitEditProfileForm(evt) {
	evt.preventDefault();
	nameInput.textContent = namePopup.value;
	jobInput.textContent = jobPopup.value;
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
