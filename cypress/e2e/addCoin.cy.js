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


    cy.get("[data-cy=coinName]").contains(1);
    cy.get("[data-cy=coinValue]").contains('36000');
    cy.get("[data-cy=coinFavorite]").should("have.length", 1);
  });


  it("should remove the coin", () => {
    cy.visit("http://localhost:5173/");
    cy.get("[data-cy=coinRemoveButton]").click();
    cy.get("[data-cy=coins]").should("have.length", 0);
  });
});
