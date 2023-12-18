beforeEach(() => {
  cy.login('joris.coppejans@yahoo.com', '12345678');
});

describe('Site beschikbaar?', () => {
  it('doet niet veel', () => {
    cy.visit('http://localhost:5173');
    });
});

describe("H1 vinden", () => {
  it("draait de applicatie", () => {
    cy.visit('http://localhost:5173');
    cy.get("h1").should("exist");
  });
});

describe("inloggen", () => {
  it("moet inloggen", () => {
    cy.login('joris.coppejans@yahoo.com', '12345678');
  });
});