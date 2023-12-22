beforeEach(() => {
  cy.login('joris.coppejans@yahoo.com', '12345678');
});

describe("Collections list", () => {
  it("should show the collections", () => {
    cy.intercept(
      "GET",
      "http://localhost:9000/api/collections",
      { fixture: 'collections.json' }
    );

    cy.visit("http://localhost:5173");

    cy.get("[data-cy=collectionId]").contains("1");
    cy.get("[data-cy=collectionValue]").contains("13388.81");
  });
});
