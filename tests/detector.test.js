// tests/detector.test.js
// Suíte de testes para detector.js após refatoração (Luhn obrigatório)

const { detectCardBrand, isValidLuhn } = require('../src/detector');

describe('Algoritmo de Luhn', () => {
  it('deve retornar true para números válidos (Luhn)', () => {
    expect(isValidLuhn('4111111111111111')).toBe(true);     // Visa
    expect(isValidLuhn('869906577893272')).toBe(true);      // Voyager
  });

  it('deve retornar false para números inválidos (Luhn)', () => {
    expect(isValidLuhn('1234567890123456')).toBe(false);
    expect(isValidLuhn('4111111111111112')).toBe(false);    // Visa com último dígito alterado
  });
});

describe('detectCardBrand (Luhn obrigatório)', () => {
  it('deve retornar erro de Luhn para número inválido', () => {
    expect(detectCardBrand('4111111111111112')).toBe('Número inválido (falha no Luhn)');
  });

  it('deve identificar Visa', () => {
    expect(detectCardBrand('4111111111111111')).toBe('Visa');
  });

  it('deve identificar MasterCard', () => {
    expect(detectCardBrand('5105105105105100')).toBe('MasterCard');
  });

  it('deve identificar American Express', () => {
    expect(detectCardBrand('378282246310005')).toBe('American Express');
  });

  it('deve identificar Diners Club', () => {
    expect(detectCardBrand('30569309025904')).toBe('Diners Club');
  });

  it('deve identificar Discover', () => {
    expect(detectCardBrand('6011111111111117')).toBe('Discover');
  });

  it('deve identificar Elo', () => {
    expect(detectCardBrand('5041750000000000')).toBe('Elo');
  });

  it('deve identificar Hipercard', () => {
    expect(detectCardBrand('6062825624254001')).toBe('Hipercard');
  });

  it('deve identificar Aura', () => {
    expect(detectCardBrand('5022345678901234')).toBe('Aura');
  });

  it('deve identificar enRoute', () => {
    expect(detectCardBrand('201400000000009')).toBe('enRoute');
  });

  it('deve identificar JCB', () => {
    expect(detectCardBrand('3530111333300000')).toBe('JCB');
  });

  it('deve identificar Voyager', () => {
    expect(detectCardBrand('869906577893272')).toBe('Voyager');
  });

  it('deve retornar Desconhecido para número válido mas não mapeado', () => {
    expect(detectCardBrand('7955057179660402')).toBe('Desconhecido');
  });
});
