export default class Api {
	constructor(host, token) {
		this._host = host;
		this._token = token;
	}

	getInitialCards() {
		return fetch(`${this._host}cards`, {
			headers: {
				authorization: this._token,
			},
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(err);
			})
			.then(result => {
				return result;
			})
			.catch(err => console.log(err));
	}

	getInfoProfile() {
		return fetch(`${this._host}users/me`, {
			headers: {
				authorization: this._token,
			},
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(err);
			})
			.then(result => {
				return result;
			})
			.catch(err => console.log(err));
	}

	setProfileInfo(inputsList) {
		return fetch(`${this._host}users/me`, {
			method: "PATCH",
			headers: {
				authorization: this._token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: inputsList["input-name"],
				about: inputsList["input-job"],
			}),
		});
	}
	removeCard(id) {
		return fetch(`${this._host}cards/${id}`, {
			method: "Delete",
			headers: {
				authorization: this._token,
			},
		})
			.then(res => {
				if (res.ok) {
					return Promise.resolve(res);
				}
				return Promise.reject(res.status);
			})
			.catch(err => console.log(err));
	}

	addNewCard(inputsList) {
		return fetch(`${this._host}cards`, {
			method: "POST",
			headers: {
				authorization: this._token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: inputsList["input-title"],
				link: inputsList["input-image"],
			}),
		});
	}
	SetLike(id) {
		return fetch(`${this._host}cards/${id}/likes`, {
			method: "PUT",
			headers: {
				authorization: this._token,
			},
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(err);
			})
			.then(result => {
				return result;
			})
			.catch(err => console.log(err));
	}
	RemoveLike(id) {
		return fetch(`${this._host}cards/${id}/likes`, {
			method: "DELETE",
			headers: {
				authorization: this._token,
			},
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(err);
			})
			.then(result => {
				return result;
			})
			.catch(err => console.log(err));
	}
	setNewAvatar(avatar) {
		return fetch(`${this._host}users/me/avatar`, {
			method: "PATCH",
			headers: {
				authorization: this._token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				avatar: avatar,
			}),
		});
	}
}
