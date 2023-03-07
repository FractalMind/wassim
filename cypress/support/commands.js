// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
Cypress.Commands.add('realLogin', () => {
    cy.visit('http://localhost:4200/login')
    cy.get('[formControlName=email]').clear().type('test@test.com')
    cy.get('[formControlName=password]').clear().type('Mypassword007?')
    cy.get('[data-test=loginButton]')
        .contains('Login').click()
    cy.url().should('contain', 'todo')
})

Cypress.Commands.add('loginWithFixture', () => {

    //Deletes the firebase indexdb and force the logout
    indexedDB.deleteDatabase('firebaseLocalStorageDb');

    cy.fixture('login.signInWithPassword').then((signInWithPasswordFixture) => {
        cy.fixture('login.lookup').then((lookupFixture) => {

            cy.visit('http://localhost:4200/login');
            cy.intercept('POST', '*accounts:signInWithPassword*', signInWithPasswordFixture).as('signInWithPassword')
            cy.intercept('POST', '*accounts:lookup*', lookupFixture).as('lookup')

            cy.get('[data-test=loginButton]').click()
            cy.wait('@signInWithPassword')
            cy.wait('@lookup')
        })
    })
})
