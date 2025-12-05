# 🛡️ SeguraBank - Sistema de Seguro de Vida

![Nest Logo](https://img.shields.io/badge/-NestJS-E0234E?logo=nestjs&logoColor=white&style=flat-square)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=flat-square)
![NodeJS](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white&style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

## 💡 Sobre o Projeto

O **SeguraBank** é um sistema desenvolvido para gerenciar o Seguro de Vida oferecido por um banco. O sistema possibilita cadastrar clientes, consultar informações, atualizar dados pessoais e remover registros quando necessário.

O objetivo principal deste projeto é:

> **Proporcionar uma solução simples, direta e eficiente para o banco controlar os clientes que contrataram o seguro, permitindo futuras integrações com apólices, pagamentos e análise de risco.** 
Esta aplicação foi desenvolvida utilizando o framework NestJS, que garante uma arquitetura modular, escalável e eficiente, seguindo os padrões de design de software.

## 🚀 Tecnologias Utilizadas

* **Framework:** [NestJS](https://nestjs.com/) (Node.js)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Banco de Dados:** [MySQL Workbench]
* **ORM/ODM:** [TypeORM]
* **Testes:** Jest & Supertest
* **Padronização:** ESLint

## ⚙️ Instalação e Configuração

Siga estes passos para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

Certifique-se de ter os seguintes programas instalados:

* Node.js (versão recomendada: 18+)
* npm (gerenciador de pacotes)
* MySQL Workbench (servidor local ou credenciais de acesso)

### Passos de Instalação

1.  **Clone o Repositório**
    ```bash
    git clone [https://github.com/SeguraBank-JS11/SeguraBank.git](https://github.com/SeguraBank-JS11/SeguraBank.git)
    cd SeguraBank
    ```

2.  **Instale as Dependências**
    ```bash
    npm install
    ```

3.  **Configuração de Ambiente (.env)**
    Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente necessárias.

    ```
    # Variáveis Gerais
    PORT=3000

    # Configuração do Banco de Dados
    DATABASE_TYPE=postgres # Ou mysql, mongodb, etc.
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_USERNAME=user
    DATABASE_PASSWORD=password
    DATABASE_NAME=segurabank_db

    # Segurança
    JWT_SECRET=SuaChaveSecretaParaTokensJWT
    # Outras variáveis de terceiros...
    ```
    ***Ajuste as chaves de conexão do banco de dados conforme a sua configuração real.***

4.  **Rodar Migrações (Se aplicável)**
    Se você estiver usando um ORM com migrações, execute o comando de migração:
    ```bash
    # Exemplo com TypeORM (Ajuste o comando conforme o seu ORM)
    npm run migration:run
    ```

## 🚀 Execução da Aplicação

### Modo Desenvolvimento

A aplicação será executada em modo *watch* (reinicia automaticamente ao salvar alterações).

```bash
# Executa a aplicação em modo de desenvolvimento
npm run start:dev
```

A API estará disponível em http://localhost:3000.

Modo Produção
Compila e executa o código final.
## Compila o TypeScript
```bash
npm run build
```
## Executa a versão compilada
```bash
npm run start:prod
```

## 🧪 Testes
O projeto utiliza o Jest para testes unitários e E2E.
```bash
npm run test
```

## 📄 Documentação da API
A documentação interativa da API (utilizando xxx, padrão do NestJS) pode ser acessada em:

[ADICIONE O ENDPOINT AQUI] (Ex: http://localhost:3000/api-docs)

## 🤝 Contribuição
Faça o fork do projeto.

1. Crie uma branch de feature: git checkout -b feature/nome-da-feature
2. Faça o commit das suas alterações: git commit -m 'feat: Adiciona [descrição da feature]'
3. Faça o push para a branch: git push origin feature/nome-da-feature
4. Abra um Pull Request.

## ⚖️ Licença
```bash
The MIT License (MIT)

Emili Torres, Gabriel Gomes, Isaac Martins, Larissa Rabello da Silva, Thatiana Mattos, Vinicius Pimentel Felicio © 2025 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
