const name = document.querySelector(".input--name");
const namePartRegex = /([A-ZА-Я][a-zа-я]+)/g;
const validSymbolRegex = /[A-ZА-Яa-zа-я]| /;
const invalidSymbolSequence = /(^[a-zа-я])|[ ][ ]+|[ ][a-zа-я]|[a-zа-я][A-ZА-Я]|[A-ZА-Я][A-ZА-Я]+/g;

name.addEventListener("input", function (event) {
  let customError = '',
    patternMathResult = [];

  if (event.inputType === 'insertFromPaste') {
    patternMathResult = name.value.match(namePartRegex);

    if (patternMathResult && patternMathResult.length) {
      name.value = patternMathResult.slice(0, 3).join(' ');
    } else {
      customError += "Вы ввели какое-то безобразие.\n";
    }
  }

  if (event.inputType === 'insertText') {  // после нажатия на клавишу
    patternMathResult = name.value.match(namePartRegex);

    if (!event.data.match(validSymbolRegex)) {
      name.value = name.value.substring(0, name.value.length - 1); // удаляем неавлидный символ
    }

    if (name.value.match(invalidSymbolSequence)) { // если есть недопутимые последовательности, то исправляем то что ввели
      if (patternMathResult && patternMathResult.length) {
        name.value = patternMathResult.slice(0, 3).join(' '); // находим подходящие куски, подставляем в инпут
      } else {
        customError += "Вы ввели какое-то безобразие.\n"; // если вообещ нгичего не подошло, то сообщаем об этом
      }
    }
  }

  if (name.validity.patternMismatch) {
    customError += "ФИО должно соотвествовать формату ввода.";
  }

  name.setCustomValidity(customError);

  if (!name.checkValidity()) {
    name.reportValidity();
  }
});

export default name;