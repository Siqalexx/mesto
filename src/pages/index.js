import "./index.css";
import Section from "../scripts/Section.js";
import FormValidator from "../scripts/FormValidator.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import Card from "../scripts/Card.js";
import Api from "../scripts/Api.js";
import PopupWithDelete from "../scripts/PopupWithDelete.js";
import {
	obj,
	elements,
	popupEditButton,
	popupAddButton,
	popupProfile,
	popupCards,
	nameEditInput,
	jobEditInput,
	removePreload,
	profileAvatar,
	buttonDelete,
	popupAvatar,
} from "../utils/components.js";

let sectionDrawPhoto;
const api = new Api(
	"https://mesto.nomoreparties.co/v1/cohort-47/",
	"bbd72978-4a3a-43ab-9797-6ffde84c5828"
);
api.getInitialCards().then(result => {
	sectionDrawPhoto = new Section(
		{
			items: result,
			renderer: item => {
				const element = createCard(item.name, item.link, item.likes, item);
				elements.append(element);
			},
		},
		elements
	);
	sectionDrawPhoto.renderItems();
});

const validityPopupAddButton = new FormValidator(obj, popupCards);
validityPopupAddButton.enableValidation();

const validityPopupEditButton = new FormValidator(obj, popupProfile);
validityPopupEditButton.enableValidation();

const validityPopupAvatar = new FormValidator(obj, popupAvatar);
validityPopupAvatar.enableValidation();

const formAdded = new PopupWithForm(".popup_cards", handleTodoSubmit);
formAdded.setEventListeners();

const formEdit = new PopupWithForm(".popup_profile", submitEditProfileForm);
formEdit.setEventListeners();

const photoPopup = new PopupWithImage(".popup_photos");
photoPopup.setEventListeners();

const formAvatar = new PopupWithForm(".popup_avatar", submitAvatarForm);
formAvatar.setEventListeners();
const profileInfo = new UserInfo(
	{
		nameEditProfile: ".profile__title",
		jobEditProfile: ".profile__subtitle",
	},
	obj
);

api.getInfoProfile().then(result => {
	profileAvatar.src = result.avatar;
	profileInfo.setUserInfo({
		newNameEditProfile: result.name,
		newJobEditProfile: result.about,
	});
});

function setFieldProfile(userInfo) {
	nameEditInput.value = userInfo.newNameEditProfile;
	jobEditInput.value = userInfo.newJobEditProfile;
}

function handleTodoSubmit(evt, inputsList) {
	evt.preventDefault();
	formAdded.renderLoading(true, "Сохранение...");
	api
		.addNewCard(inputsList)
		.then(res => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(res.status);
		})
		.then(result => {
			const cardElement = createCard(
				inputsList["input-title"],
				inputsList["input-image"],
				result.likes,
				result
			);
			sectionDrawPhoto.addItem(cardElement);
		})
		.catch(err => console.log(err))
		.finally(formAdded.renderLoading(true, "Создать"));

	formAdded.close();
}

function submitAvatarForm(evt, inputsList) {
	evt.preventDefault();
	formAvatar.renderLoading(true, "Сохранение...");
	profileAvatar.src = inputsList["input-image"];
	api
		.setNewAvatar(inputsList["input-image"])
		.then(res => {
			if (res.ok) {
				return Promise.resolve(res);
			}
			return Promise.reject(res.status);
		})
		.catch(err => console.log(err))
		.finally(() => {
			formAvatar.renderLoading(true, "Cохранить");
		});
	formAvatar.close();
}

function submitEditProfileForm(evt, inputsList) {
	evt.preventDefault();
	formEdit.renderLoading(true, "Сохранение...");
	api
		.setProfileInfo(inputsList)
		.then(res => {
			if (res.ok) {
				return Promise.resolve(res);
			}
			return Promise.reject(res.status);
		})
		.catch(err => console.log(err))
		.finally(formEdit.renderLoading(true, "Создать"));
	profileInfo.setUserInfo({
		newNameEditProfile: inputsList["input-name"],
		newJobEditProfile: inputsList["input-job"],
	});
	formEdit.close();
}

function createCard(name, link, likes, id) {
	const card = new Card(
		link,
		name,
		likes,
		id,
		handleCardClick,
		handleCardDelete,
		api
	);
	return card.createElement();
}

const popupDelete = new PopupWithDelete(".popup_delete", id => {
	api.removeCard(id);
});
popupDelete.setEventListeners();

function handleCardDelete(view, id) {
	popupDelete.open(view, id);
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

profileAvatar.addEventListener("click", () => {
	validityPopupAvatar.resetInputs();
	validityPopupAvatar.doButtonInactive();
	formAvatar.open();
});

popupAddButton.addEventListener("click", () => {
	validityPopupAddButton.resetInputs();
	validityPopupAddButton.doButtonInactive(popupCards);
	formAdded.open();
});

window.addEventListener("load", removePreload); // функция для удаления меркания transition на движке гугл после прогрузки.
