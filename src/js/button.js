const button = document.querySelector('.main__submit-button');
const form = document.querySelector('main__form');

import name from './name.js';
import phone from './phone.js';
import email from './email.js';

button.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (!name.checkValidity()) {
    name.reportValidity();
    return;
  }

  if (!phone.checkValidity()) {
    phone.reportValidity();
    return;
  }

  if (!email.checkValidity()) {
    email.reportValidity();
    return;
  }

  const data = {
    name: name.value,
    email: email.value,
    phone: phone.value
  };
  const formData = new FormData();
  const wantPromise = false;

  console.log(data.name);
  console.log(data.email);
  console.log(data.phone);

  for (let key in data) {
    formData.append(key, data[key])
  }

  if (wantPromise) {
    fetch('localhost:8080', {
      method: 'POST',
      headers: {
        'Content-type': 'multipart/form-data'
      },
      body: formData
    })
      .then(response => {
        if (response.ok) {
          console.log('Всё хорошо')
        } else {
          console.log('Ошибка: ' + response.status)
        }
      })
      .catch(() => {
        console.error('Ужасная ошибка в интеренет соеденение, всё пропало.')
      })

  } else {
    const request = new XMLHttpRequest();

    request.addEventListener('load', (evt) => {
      let error = '';
      switch (request.status) {
        case 200:
          error = '';
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Cтатус ответа: : ' + request.status + ' ' + request.statusText;
      }

      if (error) {
        throw new Error(error);
      } else {
        console.log(request)
      }
    });

    request.open('POST', 'localhost:8080');
    request.setRequestHeader('Content-type', 'multipart/form-data');
    request.send(formData);
  }
})