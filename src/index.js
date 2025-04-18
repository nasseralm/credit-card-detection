#!/usr/bin/env node
// src/index.js
// Ponto de entrada CLI para detecção de bandeira de cartão de crédito

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { detectCardBrand, isValidLuhn } = require('./detector');

// Configuração de argumentos via yargs
const argv = yargs(hideBin(process.argv))
  .usage('Uso: $0 <número-do-cartão> [opções]')
  .example('$0 4111111111111111', 'Detecta bandeira para número de cartão')
  .example('$0 4111 1111 1111 1111 --luhn', 'Detecta bandeira e validação Luhn, mesmo com espaços')
  .option('luhn', {
    alias: 'l',
    type: 'boolean',
    description: 'Validar número do cartão usando o algoritmo de Luhn'
  })
  .demandCommand(1, 'Você deve informar o número do cartão para prosseguir.')
  // garantir que posicionais sejam tratados como string
  .coerce(['0'], args => args.map(String))
  .help('h')
  .alias('h', 'help')
  .argv;

// Une todos os argumentos posicionais em uma única string (para lidar com espaços e parsing numérico)
const cardNumber = argv._.map(String).join('');
const validateLuhn = argv.luhn || false;

// Executa a detecção
const result = detectCardBrand(cardNumber, validateLuhn);

// Exibe o resultado de forma clara
console.log(`Bandeira detectada: ${result}`);

// Se o usuário pediu validação Luhn, informe também o status
if (validateLuhn) {
  const luhnStatus = isValidLuhn(cardNumber)
    ? 'Válido segundo Luhn'
    : 'Inválido segundo Luhn';
  console.log(`Luhn: ${luhnStatus}`);
}
