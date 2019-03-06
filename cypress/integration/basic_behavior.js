describe('Basic behavior', () => {
  it('passes through all props', () => {
    cy.visit('/basic-behavior');

    cy.contains('Sticky content')
      .should('have.class', 'sticky-classname')
      .should('have.attr', 'data-foo', 'some-data-attr');
  });

  it('is not sticky at start', () => {
    cy.visit('/basic-behavior');

    cy.contains('Sticky content').should(
      'not.have.class',
      'sticky-classname--stuck',
    );
  });

  it('becomes sticky after scrolling down', () => {
    cy.visit('/basic-behavior');

    cy.scrollTo(0, 1);
    cy.contains('Sticky content').should(
      'have.class',
      'sticky-classname--stuck',
    );
  });

  it('becomes not sticky after scrolling down and then up again', () => {
    cy.visit('/basic-behavior');

    cy.scrollTo(0, 1);
    cy.scrollTo(0, 0);
    cy.contains('Sticky content').should(
      'not.have.class',
      'sticky-classname--stuck',
    );
  });

  it('becomes unstuck when scrolled out of view', () => {
    cy.visit('/unstuck-when-out-of-view');

    cy.scrollTo(0, 500);
    cy.contains('is stuck');

    cy.scrollTo(0, 1000);
    cy.contains('is not stuck');
  });
});
