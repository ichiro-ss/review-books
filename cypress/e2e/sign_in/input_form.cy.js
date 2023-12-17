describe('input form', () => {
  it('sign in', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[type="email"]').type('sample');
    cy.get('.error-message').should('be.visible');

    cy.get('input[type="email"]').type('sample@email.com');
    cy.get('.error-message').should('not.be.visible');
  });
});
