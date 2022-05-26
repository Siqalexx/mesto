let popup = document.querySelector(".popup");
let formElement = document.querySelector(".popup__container");
let nameInput = document.querySelector(".profile__title");
let jobInput = document.querySelector(".profile__subtitle");
let editPopup = document.querySelector(".profile__button-edit");
let exitPopup = formElement.querySelector(".popup__exit");
let namePopup = formElement.querySelector(".popup__input_content_name");
let jobPopup = formElement.querySelector(".popup__input_content_job");

function formSubmitHandler(evt) {
	evt.preventDefault();
	nameInput.textContent = namePopup.value;
	jobInput.textContent = jobPopup.value;
	closePopup();
}

function saveName() {
	namePopup.value = nameInput.textContent;
	jobPopup.value = jobInput.textContent;
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
