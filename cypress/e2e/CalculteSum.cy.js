beforeEach(() => {
  cy.login('joris.coppejans@yahoo.com', '12345678');
});

describe('Add collection', () => {
  it("should add a collection", () => {
    cy.visit("http://localhost:5173/collections/");
    cy.get("[data-cy=submitButton]").click();
    
    cy.visit("http://localhost:5173/coins/");

    cy.get("[data-cy=coinNameInput]").type("$BCH");
    cy.get("[data-cy=coinCollectionIdInput]").type("1");
    cy.get("[data-cy=submitCoin]").click();

    cy.visit("http://localhost:5173/");


    let value1 = cy.get("[data-cy=coinValue]").contains(10);
    let value2 = cy.get("[data-cy=coinValue]").contains(10);
    cy.get("[data-cy=collectionValue]").contains(value1+value2);
  });
});