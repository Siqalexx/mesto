export default class UserInfo {
	constructor({ nameEditProfile, jobEditProfile }) {
		this._nameEditProfile = document.querySelector(nameEditProfile);
		this._jobEditProfile = document.querySelector(jobEditProfile);
	}

	getUserInfo() {
		return {
			newNameEditProfile: this._nameEditProfile.textContent,
			newJobEditProfile: this._jobEditProfile.textContent,
		};
	}
	setUserInfo({ newNameEditProfile, newJobEditProfile }) {
		this._nameEditProfile.textContent = newNameEditProfile;

		this._jobEditProfile.textContent = newJobEditProfile;
	}
}
