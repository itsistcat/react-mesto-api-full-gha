const url = 'https://api.prakt.nomoredomainsrocks.ru';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    Promise.reject(`Ошибка: ${res.status}/${res.statusText}`);
  };
};

export function registerUser(email, password) {
  return fetch(`${url}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })

  })
  .then(res => checkResponse(res));
};

export function authorizeUser(email, password) {
    return fetch(`${url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(res => checkResponse(res))
      .then((data) => {
        if (data.token) {
          const { token } = data;
          localStorage.setItem('jwt', token);
  
          return token;
        };
      })
  };
  
  export function getContent(token) {
    return fetch(`${url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => checkResponse(res))
  };