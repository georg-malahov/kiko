describe('Index page', function() {
  before(function() {
    cy.visit('/');
  });

  it('should have Mapbox loaded', function() {
    cy.contains('Mapbox');
  });
});
