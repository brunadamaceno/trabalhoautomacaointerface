# Automation Exercise - Testes E2E com Cypress

Projeto individual de automação com Cypress da aplicação [Automation Exercise](https://www.automationexercise.com/), cobrindo os casos 1, 2, 3, 4, 5, 8, 9, 10, 15 e 16.

## Tecnologias

- Node.js 20+
- TypeScript
- Cypress
- Comandos customizados e funções de apoio
- GitHub Actions

## Executar localmente

```bash
npm ci
npm test
```

Outros comandos úteis:

```bash
npm run test:headed
npm run test:chrome
npm run test:open
npm run lint
```

O comando `npm test` usa o Electron empacotado pelo Cypress em modo headless,
por isso não depende de uma instalação externa do Chrome. Use `test:chrome`
quando quiser validar especificamente no Chrome.

O Cypress gera relatório JUnit em `cypress/results/`, vídeos em `cypress/videos/` e screenshots de falhas em `cypress/screenshots/`. Esses diretórios ficam fora do controle de versão.

## Casos implementados

| Caso | Cobertura |
| --- | --- |
| 1 | Registro de novo usuário |
| 2 | Login válido |
| 3 | Login inválido |
| 4 | Logout |
| 5 | Registro com email já cadastrado |
| 8 | Listagem de produtos |
| 9 | Detalhe de produto |
| 10 | Busca de produto |
| 15 | Compra com registro durante checkout |
| 16 | Compra com usuário já cadastrado |

## GitHub Actions

O workflow em `.github/workflows/tests.yml` instala as dependências, executa os testes Cypress em modo headless e publica screenshots e vídeos como artefatos em pushes e pull requests.
