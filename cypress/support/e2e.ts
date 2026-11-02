import './commands';

Cypress.on('uncaught:exception', (error) => error.message.includes('jQuery is not defined') ? false : undefined);
