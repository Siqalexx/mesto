const popupProfile = document.querySelector(".popup__profile");
const formEditingElement = document.querySelector(".popup__form_type_editing");
const nameInput = document.querySelector(".profile__title");
const jobInput = document.querySelector(".profile__subtitle");
const editPopup = document.querySelector(".profile__button-edit");
const exitPopup = formEditingElement.querySelector(".popup__exit");
const namePopup = formEditingElement.querySelector(
	".popup__input_content_name"
);
const jobPopup = formEditingElement.querySelector(".popup__input_content_job");

function formSubmitHandler(evt) {
	evt.preventDefault();
	nameInput.textContent = namePopup.value;
	jobInput.textContent = jobPopup.value;
	closeEditPopup();
}

function saveName() {
	namePopup.value = nameInput.textContent;
	jobPopup.value = jobInput.textContent;
}

function openPopup() {
	popupProfile.classList.add("popup_opened");
	saveName();
}

function closeEditPopup() {
	popupProfile.classList.remove("popup_opened");
}

exitPopup.addEventListener("click", closeEditPopup);
formEditingElement.addEventListener("submit", formSubmitHandler);
editPopup.addEventListener("click", openPopup);
