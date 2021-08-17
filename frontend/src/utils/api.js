class Api {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
    }

    _checkResponse(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
  }

    getInitialCards() {
      return fetch(`${this._baseUrl}cards`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      })  
      .then(this._checkResponse)
  }

  getUserInfo(){
    return fetch(`${this._baseUrl}users/me`, {  
      method: 'GET',  
      headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
})
    .then(this._checkResponse)
}

  postCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
      })
      .then(this._checkResponse)
  }

  deleteCard(data) {
    return fetch(`${this._baseUrl}cards/${data}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      })
      .then(this._checkResponse)
  }

  patchProfileInfo(data){
    return fetch(`${this._baseUrl}users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(data)
    })
    .then(this._checkResponse)
}

patchProfileAvatar(data){
  return fetch(`${this._baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      avatar: data.avatar
    })
    })
    .then(this._checkResponse)
}

changeLikeCardStatus(id, isLiked) {
  return fetch(`${this._baseUrl}cards/${id}/likes`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  }).then(this._checkResponse);
}
}

const api = new Api({
    baseUrl: "https://api.julia.p.nomoredomains.monster/",
  });

export default api;
