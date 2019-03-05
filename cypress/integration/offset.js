describe('Sticky offset from the top', () => {
  it('is not stuck until window is scrolled past the selected offset', () => {
    cy.visit('/offset');

    cy.contains('is not stuck');

    cy.scrollTo(0, 50);
    cy.contains('is not stuck');

    cy.scrollTo(0, 51);
    cy.contains('is stuck');
  });
});
