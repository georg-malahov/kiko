describe("Index page", function() {
  before(function() {
    cy.visit("/");
  });

  it("should be default React Starter Kit page", function() {
    cy.contains("Learn React");
  });
});
