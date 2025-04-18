# Credit Card Detector

[![Build Status](https://img.shields.io/github/actions/workflow/status/seu-usuario/credit-card-detection/ci.yml?branch=main)](https://github.com/seu-usuario/credit-card-detection/actions/workflows/ci.yml)
[![Lint Status](https://img.shields.io/github/actions/workflow/status/seu-usuario/credit-card-detection/lint.yml?branch=main)](https://github.com/seu-usuario/credit-card-detection/actions/workflows/lint.yml)
[![Coverage Status](https://img.shields.io/coveralls/github/seu-usuario/credit-card-detection)](https://coveralls.io/github/seu-usuario/credit-card-detection)

Aplicação CLI em **Node.js** para identificação da **bandeira** de cartões de crédito e validação automática via **Algoritmo de Luhn**.

---

## 🚀 Funcionalidades

- Detecção de principais bandeiras: Visa, MasterCard, American Express, Diners Club, Discover, Elo, Hipercard, Aura, enRoute, JCB e Voyager.
- Validação obrigatória do Algoritmo de Luhn.
- Entrada flexível (números com espaços ou hífens).

---

## 📁 Estrutura do Projeto

```text
credit-card-detection/
├── .github/                  Configuração de CI/CD (GitHub Actions)
├── docs/                     Documentação adicional
├── src/                      Código-fonte
│   ├── detector.js           Lógica de detecção e Luhn
│   └── index.js              CLI (yargs)
├── tests/                    Testes automatizados (Jest)
├── images/                   Capturas de tela e demos
├── .eslintrc.js              Regras de lint
├── .gitignore                Itens ignorados pelo Git
├── package.json              Metadata e scripts NPM
├── README.md                 Documentação do projeto
└── LICENSE                   Licença do projeto
```

---

## 💻 Pré-requisitos

- Node.js v18 ou superior
- npm v9 ou superior

---

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/credit-card-detection.git
cd credit-card-detection

# Instale dependências
npm install
```  

---

## 🚀 Uso

### Executar a CLI diretamente

```bash
node src/index.js <número-do-cartão>
```

> Exemplo:

```bash
node src/index.js 4111 1111 1111 1111
# Bandeira detectada: Visa
```  

### Validação Luhn (já obrigatória)

```bash
node src/index.js 4111111111111111
# Bandeira detectada: Visa
```  

### Instalar globalmente com npm link

```bash
npm link
cc-detector 5105105105105100
# Bandeira detectada: MasterCard
```  

---

## 🧪 Testes

```bash
# Execute a suíte de testes
npm test
```  

---

## 📦 Scripts NPM

```jsonc
{
  "scripts": {
    "start": "node src/index.js",
    "test": "jest",
    "coverage": "jest --coverage",
    "lint": "eslint src tests --fix",
    "coveralls": "cat coverage/lcov.info | coveralls"
  }
}
```

---

## ✍️ Contribuição

1. Fork deste repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das mudanças (`git commit -m 'feat: descrição da feature'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.
