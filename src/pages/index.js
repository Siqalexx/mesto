import "./index.css";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import Api from "../components/Api.js";
import PopupWithDelete from "../components/PopupWithDelete.js";
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

const sectionDrawPhoto = new Section({
	renderer: item => {
		return createCard(item.name, item.link, item.likes, item);
	},
	containerSelector: elements,
});
const api = new Api({
	baseUrl: "https://mesto.nomoreparties.co/v1/cohort-47/",
	headers: {
		authorization: "bbd72978-4a3a-43ab-9797-6ffde84c5828",
		"Content-Type": "application/json",
	},
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
		avatarProfile: ".profile__avatar",
	},
	obj
);
let myId;
Promise.all([api.getInfoProfile(), api.getInitialCards()])
	.then(([infoProfile, initialCards]) => {
		profileInfo.setAvatar(infoProfile.avatar);
		profileInfo.setUserInfo({
			newNameEditProfile: infoProfile.name,
			newJobEditProfile: infoProfile.about,
		});
		myId = infoProfile._id;
		sectionDrawPhoto.renderItems(initialCards);
	})
	.catch(err => {
		console.log(err);
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
		.then(result => {
			const cardElement = createCard(
				result.name,
				result.link,
				result.likes,
				result
			);
			formAdded.close();
			sectionDrawPhoto.prependItem(cardElement);
		})
		.catch(err => console.log(err))
		.finally(formAdded.renderLoading(true, "Создать"));
}

function submitAvatarForm(evt, inputsList) {
	evt.preventDefault();
	formAvatar.renderLoading(true, "Сохранение...");
	api
		.setNewAvatar(inputsList["input-image"])
		.then(result => {
			profileInfo.setAvatar(result.avatar);
			formAvatar.close();
		})
		.catch(err => {
			console.log(err);
		})
		.finally(() => {
			formAvatar.renderLoading(true, "Cохранить");
		});
}

function submitEditProfileForm(evt, inputsList) {
	evt.preventDefault();

	formEdit.renderLoading(true, "Сохранение...");
	api
		.setProfileInfo(inputsList)
		.then(res => {
			profileInfo.setUserInfo({
				newNameEditProfile: res.name,
				newJobEditProfile: res.about,
			});
			formEdit.close();
		})
		.catch(err => {
			console.log(err);
		})
		.finally(formEdit.renderLoading(true, "Создать"));
}
let card;
function createCard(name, link, likes, resultInfo) {
	card = new Card(
		link,
		name,
		likes,
		resultInfo,
		myId,
		handleCardClick,
		handleCardDelete,
		handleApiRemoveLike,
		handleApiSetLike
	);
	return card.createElement();
}
function handleApiSetLike(id, elementCard) {
	api.setLike(id).then(result => {
		elementCard.setLike(result);
	});
}
function handleApiRemoveLike(id, elementCard) {
	api.removeLike(id).then(result => {
		elementCard.removeLike(result);
	});
}

function handleRemoveCard(id, data) {
	api
		.removeCard(id)
		.then(res => {
			popupDelete.close();
			data.deleteElement();
		})
		.catch(err => console.log(`error: ${err}`));
}

const popupDelete = new PopupWithDelete(".popup_delete", handleRemoveCard);
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
