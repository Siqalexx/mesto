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
		})
			.then(res => {
				return this._getResponseData(res);
			})
			.then(result => {
				return result;
			});
	}

	getInfoProfile() {
		return fetch(`${this._baseUrl}users/me`, {
			headers: this._headers,
		})
			.then(res => {
				return this._getResponseData(res);
			})
			.then(result => {
				return result;
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
		});
	}
	removeCard(id) {
		return fetch(`${this._baseUrl}cards/${id}`, {
			method: "Delete",
			headers: this._headers,
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
		});
	}
	setLike(id) {
		return fetch(`${this._baseUrl}cards/${id}/likes`, {
			method: "PUT",
			headers: this._headers,
		})
			.then(res => {
				return this._getResponseData(res);
			})
			.then(result => {
				return result;
			});
	}
	removeLike(id) {
		return fetch(`${this._baseUrl}cards/${id}/likes`, {
			method: "DELETE",
			headers: this._headers,
		})
			.then(res => {
				return this._getResponseData(res);
			})
			.then(result => {
				return result;
			});
	}
	setNewAvatar(avatar) {
		return fetch(`${this._baseUrl}users/me/avatar`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({
				avatar: avatar,
			}),
		});
	}
}
