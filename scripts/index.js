let popup = document.querySelector(".popup");
let formElement = document.querySelector(".popup__container");
let nameInput = document.querySelector(".profile__title");
let jobInput = document.querySelector(".profile__subtitle");
let editPopup = document.querySelector(".button-edit");
let exitPopup = formElement.querySelector(".popup__exit");

function formSubmitHandler(evt) {
	evt.preventDefault();
	nameInput.textContent = formElement.querySelector(".popup__name").value;
	jobInput.textContent = formElement.querySelector(".popup__job").value;
	closePopup();
}

function saveName() {
	formElement.querySelector(".popup__name").value = nameInput.textContent;
	formElement.querySelector(".popup__job").value = jobInput.textContent;
}

function openPopup() {
	popup.classList.add("popup_opened");
	saveName();
}

function closePopup() {
	popup.classList.remove("popup_opened");
}

exitPopup.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);
editPopup.addEventListener("click", openPopup);
