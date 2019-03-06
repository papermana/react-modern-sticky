const test = ({ route }) => {
  it('is not stuck until window is scrolled past the selected offset', () => {
    cy.visit(route);

    cy.contains('is not stuck');

    cy.scrollTo(0, 50);
    cy.contains('is not stuck');

    cy.scrollTo(0, 51);
    cy.contains('is stuck');
  });
};

describe('Sticky offset from the top', () => {
  describe('using CSS', () => {
    test({ route: '/offset' });
  });

  describe('using prop', () => {
    test({ route: '/offset-via-prop' });
  });
});
