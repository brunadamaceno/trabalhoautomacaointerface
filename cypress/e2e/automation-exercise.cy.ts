import { newUser } from '../fixtures/user';

const visitHome = () => { cy.visit('/'); cy.title().should('contain', 'Automation Exercise'); };
const openLogin = () => { cy.contains('a', 'Signup / Login').click(); cy.url().should('include', '/login'); };
const startSignup = (name: string, email: string) => { cy.get('[data-qa="signup-name"]').type(name); cy.get('[data-qa="signup-email"]').type(email); cy.contains('button', 'Signup').click(); };
const addProductAndCheckout = () => { cy.contains('a', 'Products').click(); cy.get('.productinfo').first().contains('Add to cart').click(); cy.contains('a', 'View Cart').click(); cy.contains('Proceed To Checkout').click(); };
const completePayment = (userName: string) => {
  cy.contains('a', 'Cart').click(); cy.contains('Proceed To Checkout').click(); cy.contains('Address Details').should('be.visible');
  cy.get('textarea[name="message"]').type('Order created by automated test'); cy.contains('Place Order').click();
  cy.get('[data-qa="name-on-card"]').type(userName); cy.get('[data-qa="card-number"]').type('4111111111111111'); cy.get('[data-qa="cvc"]').type('123'); cy.get('[data-qa="expiry-month"]').type('12'); cy.get('[data-qa="expiry-year"]').type('2030');
  cy.contains('button', 'Pay and Confirm Order').click(); cy.contains('b', 'Order Placed!').should('be.visible');
};

describe('Automation Exercise - casos de teste', () => {
  it('Caso 1 - registrar um novo usuario', () => { const u = newUser(); visitHome(); openLogin(); startSignup(u.name, u.email); cy.registerUser(u); cy.contains(`Logged in as ${u.name}`).should('be.visible'); });
  it('Caso 2 - login com email e senha validos', () => { const u = newUser(); visitHome(); openLogin(); startSignup(u.name, u.email); cy.registerUser(u); cy.contains('a', 'Logout').click(); cy.loginUser(u.email, u.password); cy.contains(`Logged in as ${u.name}`).should('be.visible'); });
  it('Caso 3 - login com email ou senha invalidos', () => { visitHome(); openLogin(); cy.loginUser('invalid.user@example.com', 'wrong-password'); cy.contains('Your email or password is incorrect!').should('be.visible'); });
  it('Caso 4 - logout do usuario', () => { const u = newUser(); visitHome(); openLogin(); startSignup(u.name, u.email); cy.registerUser(u); cy.contains('a', 'Logout').click(); cy.url().should('include', '/login'); });
  it('Caso 5 - tentativa de registrar email ja cadastrado', () => { const u = newUser(); visitHome(); openLogin(); startSignup(u.name, u.email); cy.registerUser(u); cy.contains('a', 'Logout').click(); openLogin(); startSignup('Another User', u.email); cy.contains('Email Address already exist!').should('be.visible'); });
  it('Caso 8 - visualizar todos os produtos', () => { visitHome(); cy.contains('a', 'Products').click(); cy.contains('h2', 'All Products').should('be.visible'); cy.get('.features_items .product-image-wrapper').should('have.length', 34); });
  it('Caso 9 - visualizar detalhes de um produto', () => { visitHome(); cy.contains('a', 'Products').click(); cy.get('a[href^="/product_details/"]').first().click(); cy.url().should('match', /product_details\/\d+/); cy.contains('Blue Top').should('be.visible'); cy.contains('Category: Women > Tops').should('be.visible'); cy.contains(/^Rs\. \d+$/).should('be.visible'); });
  it('Caso 10 - pesquisar um produto', () => { visitHome(); cy.contains('a', 'Products').click(); cy.get('#search_product').type('Blue Top'); cy.get('#submit_search').click(); cy.contains('h2', 'Searched Products').should('be.visible'); cy.get('.features_items .product-image-wrapper').should('have.length', 1); cy.contains('Blue Top').should('be.visible'); });
  it('Caso 15 - finalizar compra registrando usuario durante o checkout', () => { const u = newUser(); visitHome(); addProductAndCheckout(); cy.get('.modal-content').contains('a', 'Register / Login').click(); cy.url().should('include', '/login'); startSignup(u.name, u.email); cy.registerUser(u); completePayment(u.name); });
  it('Caso 16 - finalizar compra com usuario previamente cadastrado', () => { const u = newUser(); visitHome(); openLogin(); startSignup(u.name, u.email); cy.registerUser(u); addProductAndCheckout(); completePayment(u.name); });
});
