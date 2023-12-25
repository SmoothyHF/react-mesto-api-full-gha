import checkResponse from "./checkResponse";
const token = localStorage.getItem('jwt')

export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
        this._checkResponse = checkResponse;
    }

    getAppInfo() {
        return Promise.all([
            this.getInitialCards(), this.getUserInfo()
        ])
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
        })
            .then(this._checkResponse)
    }

    changeUserInfo({ name, about }) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about,
            })
        })
            .then(this._checkResponse)

    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        })
            .then(this._checkResponse)
    }

    changeAvatar({ avatar }) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(this._checkResponse)
    }

    addCard({ title, link }) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: title,
                link: link
            })
        })
            .then(this._checkResponse)
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    likeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(this._checkResponse)
    }

    disLikeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkResponse)
    }
}

export const api = new Api({
    // url: 'https://mesto.nomoreparties.co/v1/cohort-68',
    url: 'http://localhost:3000',
    // url: 'http://mesto-smoothy.nomoredomainsmonster.ru',
    headers: {
        authorization: `Bearer ${token}`,
        // authorization: '5e479d65-5855-47a5-9b21-4f46b81367c4',
        'Content-Type': 'application/json'
    }
});