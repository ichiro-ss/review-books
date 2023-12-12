describe('input form', () => {
  it('sign in', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[name=email').type('sample');
    cy.get('.error-message').should('be.visible');

    cy.get('input[name=email').type('sample@email.com');
    cy.get('.error-message').should('not.be.visible');
  });
});
