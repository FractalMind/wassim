describe('Testing the login page', () => {

    beforeEach('test', () => {
        cy.loginWithFixture()
    })

    it('Create new task', () => {
        cy.fixture('todo.get-task-list').then((getTaskListFixture) => {
            cy.get('#addButton').click()
            cy.get('.mat-toolbar > h3').contains('Create a new task')
            cy.get('[formControlName=name]').type('Cypress task creation test 11111')

            cy.intercept('POST', '*').as('createTask')
            cy.intercept('GET', '/todos*', getTaskListFixture).as('getTaskList')

            cy.get('[data-test=createTask]').click()

            cy.wait('@createTask').then((intercept) => {
                expect(intercept.request.body).to.deep.equal({
                    name: "Cypress task creation test 11111"
                });
            });

            cy.wait('@getTaskList').then((intercept) => {
                expect(intercept.response.statusCode).to.eq(200)
            });

            cy.contains('Cypress task creation test 11111');
            cy.contains('Cypress task creation test 22222');
        })
    })
})