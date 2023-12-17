describe('input form', () => {
  it('sign in', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[type="email"]').type('sample');
    cy.get('input[type="password"]').click();
    cy.get('.validation-err-email').should('be.visible');

    cy.get('input[type="email"]').clear();

    cy.get('input[type="email"]').type('sample@email.com');
    cy.get('input[type="password"]').click();
    cy.get('.validation-err-email').should('not.exist');
  });
});
