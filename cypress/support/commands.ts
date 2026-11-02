import { User } from '../fixtures/user';

declare global { namespace Cypress { interface Chainable { registerUser(user: User): Chainable<void>; loginUser(email: string, password: string): Chainable<void>; } } }

Cypress.Commands.add('registerUser', (user: User) => {
  cy.get('#id_gender1').check();
  cy.get('[data-qa="password"]').type(user.password);
  cy.get('[data-qa="days"]').select('10');
  cy.get('[data-qa="months"]').select('May');
  cy.get('[data-qa="years"]').select('1990');
  cy.get('#newsletter').check();
  cy.get('#optin').check();
  cy.get('[data-qa="first_name"]').type(user.firstName);
  cy.get('[data-qa="last_name"]').type(user.lastName);
  cy.get('[data-qa="company"]').type('Test Company');
  cy.get('[data-qa="address"]').type('100 Test Avenue');
  cy.get('[data-qa="country"]').select('United States');
  cy.get('[data-qa="state"]').type('California');
  cy.get('[data-qa="city"]').type('San Francisco');
  cy.get('[data-qa="zipcode"]').type('94105');
  cy.get('[data-qa="mobile_number"]').type('11999999999');
  cy.contains('button', 'Create Account').click();
  cy.contains('b', 'Account Created!').should('be.visible');
  cy.contains('a', 'Continue').click();
});

Cypress.Commands.add('loginUser', (email: string, password: string) => {
  cy.get('[data-qa="login-email"]').type(email);
  cy.get('[data-qa="login-password"]').type(password);
  cy.contains('button', 'Login').click();
});

export {};
