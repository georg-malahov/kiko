describe('Mapbox', function() {
  beforeEach(function() {
    cy.visit('/');
    cy.server();
    cy.route('https://api.foursquare.com/v2/venues/search*').as('search');
  });

  it('should be loaded', function() {
    cy.contains('Mapbox');
  });

  it('should request venues on load', function() {
    cy.wait('@search');
  });

  it('should request venues on zoomend', function() {
    cy.wait('@search');
    cy.get('.mapboxgl-map.loaded').dblclick();
    cy.wait('@search');
  });

  it.skip('should request venues on dragend', function() {
    cy.wait('@search');
    cy.get('.mapboxgl-map.loaded')
      .trigger('mousedown', 'top', { which: 1 })
      .trigger('mousemove', 'bottom')
      .trigger('mouseup', { force: true });
    cy.wait('@search');
  });
});
