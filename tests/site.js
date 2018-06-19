describe('Cypress Testing for Tower Project', () => {
  it('Has page load with correct elements and function', () => {
    cy.visit('/');
    cy.get('h1').should('have.text', 'OfficePool')
    cy.get('.matchup-headers h2').should('have.text', 'Matchups - Pick 10')
    cy.get('.nav-bar a').should('have.length', 5)
    cy.get('#submit-button button').should('have.text', 'Submit Picks')
    cy.get('.games .left').should('have.length', 16)
    cy.get('button.ui.mini.button').should('have.length', 4)

  })
})
