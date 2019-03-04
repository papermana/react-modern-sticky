describe('Function as child pattern', () => {
  it('passes value isStuck to functional children', () => {
    cy.visit('/function-as-child');

    cy.contains('is not stuck');

    cy.scrollTo(0, 1);
    cy.contains('is stuck');

    cy.scrollTo(0, 0);
    cy.contains('is not stuck');
  });
});
