/// <reference types="cypress" />
const users = require('../../fixtures/auth-users.json');

// This spec file contains all login (negative and positive test cases)

describe('Negative and Postive login tests', () => {

    beforeEach(() => {
        cy.visit('https://the-internet.herokuapp.com/login')
    });

    it('Blank username and password', () => {
        cy.get('[class*="fa fa-2x fa-sign-in"]').should('contain', 'Login').click();
        cy.get('[id="flash-messages"]').should("contain", 'Your username is invalid!')
    });

    it('Blank username and valid password', () => {
        cy.get('[id="password"]').type(users.validCredentials.password);
        cy.get('[class*="fa fa-2x fa-sign-in"]').click();
        cy.get('[id="flash-messages"]').should("contain", 'Your username is invalid!')
    })

    it('Valid username and blank password', () => {
        cy.get('[id="username"]').type(users.validCredentials.email);
        cy.get('[class*="fa fa-2x fa-sign-in"]').click();
        cy.get('[id="flash-messages"]').should("contain", 'Your password is invalid!')
    })

    it('Successful login and logout', () => {
        cy.get('[id="username"]').type(users.validCredentials.email);
        cy.get('[id="password"]').type(users.validCredentials.password);
        cy.get('[class*="fa fa-2x fa-sign-in"]').click();
        cy.get('[class*="flash success"]').should("contain", 'You logged into a secure area!')
        cy.get('[class*="icon-2x icon-signout"]').should("contain", ' Logout').click()
        cy.get('[class*="flash success"]').should("contain", 'You logged out of the secure area!')
    })

    it('Invalid username and valid password', () => {
        cy.get('[id="username"]').type(users.invalidCredentials.email);
        cy.get('[id="password"]').type(users.validCredentials.password);
        cy.get('[class*="fa fa-2x fa-sign-in"]').click();
        cy.get('[id="flash-messages"]').should("contain", 'Your username is invalid!')
    })

    it('Valid username and invalid password', () => {
        cy.get('[id="username"]').type(users.validCredentials.email);
        cy.get('[id="password"]').type(users.invalidCredentials.password);
        cy.get('[class*="fa fa-2x fa-sign-in"]').click();
        cy.get('[id="flash-messages"]').should("contain", 'Your password is invalid!')
    })

    it('Invalid username and invalid password with special characters', () => {
        cy.get('[id="username"]').type(users.specialCharacterCredentials.email);
        cy.get('[id="password"]').type(users.specialCharacterCredentials.password);
        cy.get('[class*="fa fa-2x fa-sign-in"]').click();
        cy.get('[id="flash-messages"]').should("contain", 'Your username is invalid!')
    })

    it('Invalid username and invalid password with special characters', () => {
        cy.get('[id="username"]').type(users.specialCharacterCredentials.email);
        cy.get('[id="password"]').type(users.specialCharacterCredentials.password);
        cy.get('[class*="fa fa-2x fa-sign-in"]').click();
        cy.get('[id="flash-messages"]').should("contain", 'Your username is invalid!')
    })

    // TODO: Authenticate via API (create a cypress command) and then get to the homepage
})
