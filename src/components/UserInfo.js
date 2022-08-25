export default class UserInfo {
	constructor({ nameEditProfile, jobEditProfile, avatarProfile }) {
		this._nameEditProfile = document.querySelector(nameEditProfile);
		this._jobEditProfile = document.querySelector(jobEditProfile);
		this._avatarProfile = document.querySelector(avatarProfile);
	}

	getUserInfo() {
		return {
			newNameEditProfile: this._nameEditProfile.textContent,
			newJobEditProfile: this._jobEditProfile.textContent,
		};
	}
	setAvatar(newAvatar) {
		this._avatarProfile.src = newAvatar;
	}
	setUserInfo({ newNameEditProfile, newJobEditProfile }) {
		this._nameEditProfile.textContent = newNameEditProfile;

		this._jobEditProfile.textContent = newJobEditProfile;
	}
}
