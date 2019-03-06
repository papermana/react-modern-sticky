describe('Callback feature', () => {
  it('calls back when stuck', () => {
    cy.visit('/callback');

    cy.contains('is not stuck');
    cy.contains('callback: not stuck');

    cy.scrollTo(0, 1);
    cy.contains('is stuck');
    cy.contains('callback: stuck');

    cy.scrollTo(0, 0);
    cy.contains('is not stuck');
    cy.contains('callback: not stuck');
  });
});
