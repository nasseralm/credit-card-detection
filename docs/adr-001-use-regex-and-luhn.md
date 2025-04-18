# ADR 001: Uso de Regex e Algoritmo de Luhn para Detecção de Bandeiras

## Status
Aceito – 18 de abril de 2025

## Contexto
O desafio da DIO (Digital Innovation One) propõe desenvolver do zero uma aplicação para identificar a bandeira de cartões de crédito usando apenas código próprio. O objetivo é aplicar tudo o que foi aprendido durante o curso, sem recorrer a bibliotecas de validação externas.

Foram consideradas três abordagens principais:

- **Bibliotecas de terceiros** (como `credit-card-validator`): rápidas de integrar, mas não atendem ao propósito didático de escrever a lógica manualmente.
- **APIs externas** (serviços de validação): introduzem latência de rede e tiram o foco do desafio de codificação local.
- **Implementação manual**: usar expressões regulares para cada bandeira e o algoritmo de Luhn para validar plausibilidade.

## Decisão
Em alinhamento com os requisitos do desafio da DIO, optamos por:

1. **Regex manual** para cada bandeira, codificando diretamente padrões conforme a especificação ISO/IEC 7812.
2. **Algoritmo de Luhn** implementado internamente para validar números antes de testar as regex.

Essa escolha assegura que toda a lógica esteja escrita por nós, potencializando a aprendizagem prática e permitindo controle total sobre o código.

## Consequências
### Pontos Positivos
- **Aprendizado profundo**: o aluno consolida conceitos de regex e do algoritmo de Luhn na prática.
- **Sem dependências extras**: footprint reduzido, sem instalar pacotes de validação de cartão.
- **Flexibilidade**: fácil extensão adicionando novos padrões em `cardPatterns`.

### Pontos de Atenção
- **Manutenção de patterns**: novos intervalos de BIN exigem atualização manual das regex.
- **Testes obrigatórios**: para garantir cobertura completa dos padrões, é fundamental ter uma suíte de testes robusta.

### Plano de Mitigação
- Criar e manter testes automatizados em Jest para cada bandeira e casos de falha do Luhn.
- Documentar as alterações de padrões através de ADRs subsequentes.

