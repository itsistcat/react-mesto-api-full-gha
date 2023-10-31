class Api {
  constructor() {
    this._url = 'https://api.prakt.nomoredomainsrocks.ru';
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      }
    }
    );
  }

  editUserInfo(name, about) {
    return this._request(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ name, about })
    })
  }

  // Обновление аватара
  editUserAvatar(avatar) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ avatar })
    })
  }

  getCards() {
    return this._request(`${this._url}cards`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
    })
  }

  // Добавление новой карточки в галерею
  addNewCards(name, link) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ name, link })
    })

  }
  // Удаление карточки
  deleteCards(id) {
    return this._request(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
    })
  }

  changeLikeCardStatus(id, isLiked) {
    if (!isLiked) {
      return this._request(`${this._url}/cards/${id}/likes`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          'Content-type': 'application/json'
        },
      })
    } else {
      return this._request(`${this._url}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          'Content-type': 'application/json'
        },
      })
    }
  }
}
export const api = new Api();