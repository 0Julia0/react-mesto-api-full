class Api {
  constructor({headers, baseUrl}) {
    this._headers = headers;
    this._baseUrl = baseUrl;
    }

    _checkResponse(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
  }

    getInitialCards() {
      return fetch(`${this._baseUrl}cards`, {headers: this._headers})  
      .then(this._checkResponse)
  }

  getUserInfo(){
    return fetch(`${this._baseUrl}users/me`, {headers: this._headers})
    .then(this._checkResponse)
}

  postCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
      })
      .then(this._checkResponse)
  }

  deleteCard(data) {
    return fetch(`${this._baseUrl}cards/${data}`, {
      method: 'DELETE',
      headers: this._headers,
      })
      .then(this._checkResponse)
  }

  patchProfileInfo(data){
    return fetch(`${this._baseUrl}users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify(data)
    })
    .then(this._checkResponse)
}

patchProfileAvatar(data){
  return fetch(`${this._baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      avatar: data.avatar
    })
    })
    .then(this._checkResponse)
}

changeLikeCardStatus(id, isLiked) {
  return fetch(`${this._baseUrl}cards/likes/${id}`, {
    method: isLiked ? "DELETE" : "PUT",
    headers: this._headers
  }).then(this._checkResponse);
}
}

const api = new Api({
    baseUrl: "http://julia.p.nomoredomains.club",
    headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
    }});

export default api;
