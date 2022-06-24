const removePreload = () => {
	const bodyPreload = document.querySelector(".body");
	bodyPreload.classList.remove("preload");
};
const popupProfile = document.querySelector(".popup_profile");
const formEditingElement = document.querySelector(".popup__form_type_editing");
const nameInput = document.querySelector(".profile__title");
const jobInput = document.querySelector(".profile__subtitle");
const editPopup = document.querySelector(".profile__button-edit");
const namePopup = formEditingElement.querySelector(
	".popup__input_content_name"
);
const jobPopup = formEditingElement.querySelector(".popup__input_content_job");
const elementTemplate = document.querySelector("#element-template").content;
const elements = document.querySelector(".elements");
const popupCards = document.querySelector(".popup_cards");
const photoPopup = document.querySelector(".popup_photos");
const popups = Array.from(document.querySelectorAll(".popup"));
const formAddedElement = document.querySelector(".popup__form_type_added");
const addPopup = document.querySelector(".profile__add-button");
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

let nameElement;
let imageElement;

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
	imagePopup.alt = element.querySelector(".element__title").textContent;
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
	element.querySelector(".element__image").alt = name;
	element.querySelector(".element__title").textContent = name;
	setCardEventListeners(element);
	return element;
};

const addCard = obj => {
	elements.append(createElement(obj.name, obj.link));
};

const handleTodoSubmit = e => {
	e.preventDefault();
	nameElement = inputName.value;
	imageElement = inputImage.value;
	elements.prepend(createElement(nameElement, imageElement));
	closePopup(popupCards);
	resetForms(formAddedElement);
};

initialCards.forEach(addCard);

function openPopup(popup) {
	document.addEventListener("keydown", closeByEscape);
	popup.classList.add("popup_opened");
}

function closePopup(popup) {
	popup.classList.remove("popup_opened");

	document.removeEventListener("keydown", closeByEscape);
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

function resetForms(popup) {
	popup.reset();
}
const doButtonInactive = popup => {
	const formButton = popup.querySelector(obj.submitButtonSelector);
	formButton.classList.add(obj.inactiveButtonClass);
	formButton.disabled = true;
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
	doButtonInactive(popupProfile);
	resetInputs(formEditingElement);
	openPopup(popupProfile);
	fillInInputsWithData();
});
addPopup.addEventListener("click", () => {
	doButtonInactive(popupCards);
	resetInputs(formAddedElement);
	resetForms(formAddedElement);
	openPopup(popupCards);
});

formAddedElement.addEventListener("submit", handleTodoSubmit);
formEditingElement.addEventListener("submit", submitEditProfileForm);
window.addEventListener("load", removePreload); // функция для удаления меркания transition на движке гугл после прогрузки.

const closeByEscape = evt => {
	if (evt.key == "Escape") {
		const openedPopup = document.querySelector(".popup_opened");
		closePopup(openedPopup);
	}
};

popups.forEach(popup => {
	popup.addEventListener("mousedown", evt => {
		if (
			evt.target.classList.contains("popup") ||
			evt.target.classList.contains("popup__exit")
		) {
			closePopup(popup);
		}
	});
});
