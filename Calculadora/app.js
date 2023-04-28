const buttons = document.querySelectorAll('.button');

const display = document.querySelector('.display');

let primeiroValor = '';
let segundoValor = '';
let operador = '';
let resultado = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (!isNaN(button.textContent) || button.textContent === '.') {
      if (operador === '') {
        primeiroValor += button.textContent;
        display.textContent = primeiroValor;
      } else {
        segundoValor += button.textContent;
        display.textContent = segundoValor;
      }
    } else if (button.textContent === 'C') {
      primeiroValor = '';
      segundoValor = '';
      operador = '';
      display.textContent = '0';
    } else if (button.textContent === '=') {
      if (operador === '+') {
        resultado = parseFloat(primeiroValor) + parseFloat(segundoValor);
      } else if (operador === '-') {
        resultado = parseFloat(primeiroValor) - parseFloat(segundoValor);
      } else if (operador === '*') {
        resultado = parseFloat(primeiroValor) * parseFloat(segundoValor);
      } else if (operador === '/') {
        resultado = parseFloat(primeiroValor) / parseFloat(segundoValor);
      }
      display.textContent = resultado;
      primeiroValor = '';
      segundoValor = '';
      operador = '';
    } else {
      operador = button.textContent;
    }
  });
});
