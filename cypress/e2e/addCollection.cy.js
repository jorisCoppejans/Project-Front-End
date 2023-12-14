describe('Add collection', () => {
  it("should add a collection", () => {
    cy.visit("http://localhost:5173/collections/");

    cy.get("[data-cy=userIdInput]").type("2");
    cy.get("[data-cy=submitButton]").click();

    cy.visit("http://localhost:5173/");


    cy.get("[data-cy=collectionId]").eq(1);
    cy.get("[data-cy=collectionUser]").eq("2");
    cy.get("[data-cy=collectionValue]").eq("0");
    cy.get("[data-cy=collection]").should("have.length", 10);
  });


  it("should remove the collection", () => {
    cy.visit("http://localhost:5173/collection/");
    cy.get("[data-cy=collection]").eq(1).click();
    cy.get("[data-cy=collection]").should("have.length", 1);
  });
});
