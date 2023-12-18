beforeEach(() => {
  cy.login('joris.coppejans@yahoo.com', '12345678');
});

describe('Add collection', () => {
  it("should add a collection", () => {
    cy.visit("http://localhost:5173/collections/");

    cy.get("[data-cy=submitButton]").click();

    cy.get("[data-cy=collectionId]").eq(1).contains(1);
    cy.get("[data-cy=collectionValue]").eq(1).contains('36000');
    cy.get("[data-cy=collection]").should("have.length", 1);
  });


  it("should remove the transaction", () => {
    cy.visit("http://localhost:5173/");
    cy.get("[data-cy=collectionRemoveButton]").eq(0).click();
    cy.get("[data-cy=transaction]").should("have.length", 0);
  });
});
