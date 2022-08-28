export default class Api {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}

	_getResponseData(res) {
		if (!res.ok) {
			return Promise.reject(`Ошибка: ${res.status}`);
		}
		return res.json();
	}

	getInitialCards() {
		return fetch(`${this._baseUrl}cards`, {
			headers: this._headers,
		}).then(res => {
			return this._getResponseData(res);
		});
	}

	getInfoProfile() {
		return fetch(`${this._baseUrl}users/me`, {
			headers: this._headers,
		}).then(res => {
			return this._getResponseData(res);
		});
	}

	setProfileInfo(inputsList) {
		return fetch(`${this._baseUrl}users/me`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({
				name: inputsList["input-name"],
				about: inputsList["input-job"],
			}),
		}).then(res => {
			return this._getResponseData(res);
		});
	}
	removeCard(id) {
		return fetch(`${this._baseUrl}cards/${id}`, {
			method: "Delete",
			headers: this._headers,
		}).then(res => {
			return this._getResponseData(res);
		});
	}

	addNewCard(inputsList) {
		return fetch(`${this._baseUrl}cards`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({
				name: inputsList["input-title"],
				link: inputsList["input-image"],
			}),
		}).then(res => {
			return this._getResponseData(res);
		});
	}
	setLike(id) {
		return fetch(`${this._baseUrl}cards/${id}/likes`, {
			method: "PUT",
			headers: this._headers,
		}).then(res => {
			return this._getResponseData(res);
		});
	}
	removeLike(id) {
		return fetch(`${this._baseUrl}cards/${id}/likes`, {
			method: "DELETE",
			headers: this._headers,
		}).then(res => {
			return this._getResponseData(res);
		});
	}
	setNewAvatar(avatar) {
		return fetch(`${this._baseUrl}users/me/avatar`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({
				avatar: avatar,
			}),
		}).then(res => {
			return this._getResponseData(res);
		});
	}
}
