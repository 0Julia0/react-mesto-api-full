const BASE_URL = 'https://auth.nomoreparties.co/';

const checkResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

export const register = (password, email) => {
    return fetch(`${BASE_URL}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({password, email}),
    })
    .then(res => checkResponse(res));
  };

  export const authorize = (password, email) => {
    return fetch(`${BASE_URL}signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({password, email}),
    })
    .then(res => checkResponse(res));
  };

  export const getContent = (jwt) => {
    return fetch(`${BASE_URL}users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${jwt}`,
      },
    })
    .then(res => checkResponse(res));
  };
