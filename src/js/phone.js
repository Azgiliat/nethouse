const phone = document.querySelector('.input--phone');
const validSymbolRegex = /\+|\d/;
const startPhoneRegex = /(\+7|07|8)/;

phone.addEventListener("input", function (event) {
  let customError = '';

  if (event.inputType === 'insertFromPaste') {// вставка
    const startPhone = phone.value.match(startPhoneRegex);

    if (startPhone) {
      const digits = phone.value.slice(startPhone.index + startPhone[0].length).match(/\d/g) // все цифры после начала телефона
      if (digits) {
        phone.value = startPhone[0] + digits.join('');
      }
    } else {
      customError += 'Тут отсутствует номер.'
    }
  }

  if (event.inputType === 'insertText') {  // после нажатия на клавишу
    if (!event.data.match(validSymbolRegex)) {
      phone.value = phone.value.substring(0, phone.value.length - 1); // удаляем неавлидный символ
    }

    if (event.data === '+' && phone.value.search(startPhoneRegex) !== -1) { // если телефон уже начался, то не позволяем вводить +
      phone.value = phone.value.substring(0, phone.value.length - 1);
    }
  }

  if (phone.validity.patternMismatch) {
    customError += 'Неверный формат телефона';
  }

  phone.setCustomValidity(customError);

  if (!phone.checkValidity()) {
    phone.reportValidity();
  }
});

export default phone;