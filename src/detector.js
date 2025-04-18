// detector.js
// Módulo para detectar bandeira de cartão de crédito e validar Luhn obrigatoriamente

// Definição de padrões em ordem de mais específicos para genéricos
const cardPatterns = [
  ['Elo', /^(4011|4312|4389|4514|4576|5041|5066|5090|6277|6362|6363)\d{12}$/],
  ['Hipercard', /^6062\d{12}$/],
  ['HiperCard', /^6062\d{12}$/],
  ['Aura', /^50\d{14}$/],
  ['enRoute', /^20(?:14|49)\d{11}$/],
  ['JCB', /^(?:2131|1800|35\d{3})\d{11}$/],
  ['Voyager', /^8699\d{11}$/],
  ['American Express', /^3[47]\d{13}$/],
  ['Diners Club', /^(3(?:0[0-5]|[68]\d)\d{11})$/],
  ['Discover', /^(6011\d{12}|65\d{14}|64[4-9]\d{13})$/],
  ['MasterCard', /^(5[1-5]\d{14}|2[2-7]\d{14})$/],
  ['Master', /^(5[1-5]\d{14}|2[2-7]\d{14})$/],
  ['Visa', /^4\d{12}(?:\d{3})?$/]
];

/**
 * Remove espaços e hífens do número
 * @param {string} number
 * @returns {string}
 */
function sanitize(number) {
  return number.replace(/\s+|-/g, '');
}

/**
 * Verifica se o número passa no Algoritmo de Luhn
 * @param {string} number
 * @returns {boolean}
 */
function isValidLuhn(number) {
  const digits = number.split('').reverse().map(d => parseInt(d, 10));
  const sum = digits.reduce((acc, digit, idx) => {
    if (idx % 2 === 1) {
      let doubled = digit * 2;
      if (doubled > 9) doubled -= 9;
      return acc + doubled;
    }
    return acc + digit;
  }, 0);
  return sum % 10 === 0;
}

/**
 * Detecta a bandeira do cartão com base no número,
 * validando obrigatoriamente o Luhn.
 * @param {string} number - número do cartão (com ou sem espaços)
 * @returns {string} - nome da bandeira ou 'Número inválido (falha no Luhn)'|'Desconhecido'
 */
function detectCardBrand(number) {
  const sanitized = sanitize(number);
  if (!isValidLuhn(sanitized)) {
    return 'Número inválido (falha no Luhn)';
  }

  for (const [brand, pattern] of cardPatterns) {
    if (pattern.test(sanitized)) {
      return brand;
    }
  }
  return 'Desconhecido';
}

// Exportações (CommonJS)
module.exports = {
  detectCardBrand,
  isValidLuhn
};
