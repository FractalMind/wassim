describe('Testing the login page', () => {

    beforeEach('test', () => {
        cy.visit('http://localhost:4200/login')
    })

    it('Test validation error for empty fields', () => {
        cy.get('[formControlName=email]').clear();
        cy.get('[formControlName=password]').clear();
        cy.get('[data-test=loginButton]').click();
        cy.get('[data-test=emailRequiredError]').contains('An email is required');
        cy.get('[data-test=requiredPasswordError]').contains('A password is required');
    })

    it('Test validation error for email malformed', () => {
        cy.get('[formControlName=email]').clear().type('wrong-email')
        cy.get('[formControlName=password]').clear()
        cy.get('[data-test=loginButton]').click()
        cy.get('[data-test=emailError]').contains('Email format not valid. Ex: test@test.com')
    })

    it('Test validation error for email malformed', () => {
        cy.get('[formControlName=email]').clear().type('@test.com')
        cy.get('[formControlName=password]').clear()
        cy.get('[data-test=loginButton]').click()
        cy.get('[data-test=emailError]').contains('Email format not valid. Ex: test@test.com')
    })

    it('Test validation error for email malformed', () => {
        cy.get('[formControlName=email]').clear().type('test.com')
        cy.get('[formControlName=password]').clear()
        cy.get('[data-test=loginButton]').click()
        cy.get('[data-test=emailError]').contains('Email format not valid. Ex: test@test.com')
    })

    it('Test for front email and password', () => {
        cy.fixture('login.email-not-found').then((data) => {
            cy.get('[formControlName=email]').clear().type('wrong-email@test.com')
            cy.get('[formControlName=password]').clear().type('wrong-password')

            cy.intercept('POST', '*', data).as('email-not-found')
            cy.get('[data-test=loginButton]').click()
            cy.wait('@email-not-found').then(() => {
                cy.get('[data-test=auth-user-not-foundError]').contains('There is no user corresponding to the given email')
            })
        })
    })

    it('Test login with fixture', () => {
        cy.loginWithFixture()
    })

})