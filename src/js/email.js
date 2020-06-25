const email = document.querySelector('.input--email');
const domain = '@gmail.com';
const domainRegex = new RegExp(domain);
const validSymbolRegex = /[a-zA-Z0-9.!#$%&'*+\/=?^_`{|@}~-]/;
const validNameRegex = /([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+)/g;

email.addEventListener("input", function (event) {
  let customError = '';
  let atIndex = email.value.search(/@/);

  if (event.inputType === 'insertFromPaste') {// вставка
    const domainIndex = email.value.search(domainRegex);

    if (domainIndex !== -1) { //  если нашли правильный домен
      email.value = email.value.substring(0, domainIndex).match(validNameRegex).join('') + '@gmail.com';
      // берем всё что до него, ищем подходящие символы, собираем в строку, дописываем домен
    } else {

      if (atIndex !== -1) {// проверяем наличие собаки вообще
        // если она все же есть, попытаемся починить домен
        const domainFixRegex = new RegExp(domain.split('').map(symbol => `(${symbol}).*`).join(''));

        if (email.value.substring(atIndex).match(domainFixRegex)) {
          email.value = email.value.substring(0, atIndex).match(validNameRegex).join('') + email.value.substring(atIndex).match(domainFixRegex).slice(1).join('');
        } else {
          customError += 'Неверный домен почты.\n'
        }
      } else {
        customError += 'Тут совсем нет @.'
      }
    }

    if (email.validity.patternMismatch) {
      customError += 'Неверный формат почты. Убедитесь, что ваша почта принадлежит @gmail.com';
    }

    email.setCustomValidity(customError);

    if (!email.checkValidity()) {
      email.reportValidity();
    }
  }

  if (event.inputType === 'insertText') {  // после нажатия на клавишу
    if (!event.data.match(validSymbolRegex)) { // если неподходящий символ
      email.value = email.value.substring(0, email.value.length - 1); // удаляем неавлидный символ
    }

    if (atIndex !== -1) { // ссли юзер поставил @, переходим к разбору домена
      const userDomain = email.value.substring(atIndex); // домен введенный юзером
      if (userDomain.length > domain.length) {
        customError += 'Неверный домен.'
      }
      if (userDomain.length === domain.length && userDomain !== domain) {
        customError += 'Неверный домен.'
      }
      if (email.validity.patternMismatch) {
        customError += 'Неверный формат почты. Убедитесь, что ваша почта принадлежит @gmail.com';
      }

      email.setCustomValidity(customError);

      if (!email.checkValidity()) {
        email.reportValidity();
      }
    }
  }
});

export default email;