# Arquitetura do Credit Card Detector

Este documento descreve a arquitetura e o fluxo de dados principais da aplicação CLI **Credit Card Detector**.

## Visão Geral

1. **Entrada (CLI)**  
   - O usuário invoca o comando `cc-detector <número-do-cartão>` ou `node src/index.js <número>`.  
   - O módulo `yargs` faz o parsing dos argumentos e passa a string de dígitos ao `index.js`.

2. **Sanitização**  
   - O número informado (possivelmente com espaços ou hífens) é enviado ao método `sanitize()` em `detector.js`.  
   - Remove caracteres não numéricos, produzindo uma string composta apenas de dígitos.

3. **Validação (Luhn)**  
   - A string sanitizada é validada pelo `isValidLuhn()`.  
   - Se a validação falhar, retorna imediatamente a mensagem de erro: **Número inválido (falha no Luhn)**.

4. **Detecção de Bandeira**  
   - Caso o Luhn seja bem‑sucedido, o fluxo percorre uma lista ordenada de pares `[bandeira, regex]`.  
   - Para cada par, o regex é testado contra a string. No primeiro match, a bandeira é retornada.

5. **Saída**  
   - O resultado é impresso no console: `Bandeira detectada: <bandeira>` ou `Número inválido (falha no Luhn)` / `Desconhecido`.

---

## Diagrama de Fluxo (Mermaid)

```mermaid
flowchart TD
  A[Início: CLI] --> B[Parser de argumentos (yargs)]
  B --> C[sanitize(number)]
  C --> D[isValidLuhn(number)]
  D -->|false| E[Imprime "Número inválido (falha no Luhn)"]
  D -->|true| F[Percorre cardPatterns]
  F -->|match| G[Retorna <bandeira>]
  F -->|nenhum match| H[Retorna "Desconhecido"]
  G --> I[Término]
  H --> I[Término]
  E --> I[Término]
```  

---

## Módulos Principais

- **`src/index.js`**  
  - Responsável pelo CLI e parsing de argumentos.  
  - Chama `detectCardBrand()` com a string final.

- **`src/detector.js`**  
  - Implementa **`sanitize()`**, **`isValidLuhn()`** e **`detectCardBrand()`**.  
  - Mantém um array de padrões `cardPatterns` ordenados por especificidade.

- **`tests/`**  
  - Contém testes Jest para Luhn e detecção de bandeiras, garantindo cobertura antes de liberação.

---

Esta arquitetura prioriza simplicidade, testabilidade e facilidade de manutenção. Para adicionar novas bandeiras, basta inserir o par apropriado em `cardPatterns` na posição correta de prioridade.
