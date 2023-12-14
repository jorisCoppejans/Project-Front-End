describe("Collections list", () => {
  it("should show the collections", () => {
    cy.intercept(
      "GET",
      "http://localhost:9000/api/collections",
      { fixture: 'collections.json' }
    );

    cy.visit("http://localhost:5173");
    cy.get("[data-cy=collection]").should("have.length", 1);
    cy.get("[data-cy=collection_place]").eq(0).contains("Chinese Restaurant");
    cy.get("[data-cy=collection_date]").eq(0).should("contain", "01/11/2021");

    cy.get("[data-cy=collectionId]").eq(1).contains("1");
    cy.get("[data-cy=collectionUser]").eq(0).contains(("5"));
    cy.get("[data-cy=collectionValue]").eq(0).contains("10");
  });


  it("should show a loading indicator for a very slow response", () => {
    cy.intercept(
        "http://localhost:9000/api/collections",
        (req) => {
          req.on("response", (res) => {
            res.setDelay(1000);
          });
        }
      ).as("slowResponse"); 
      cy.visit("http://localhost:5173"); 
      cy.get("[data-cy=loader]").should("be.visible"); 
      cy.wait("@slowResponse"); 
      cy.get("[data-cy=loader]").should("not.exist");
    });
});
