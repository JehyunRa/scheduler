describe("Navigation", () => {
  // test 1 //
  it("should visit root", () => {
    cy.visit("/");
  });

  // test 2 //
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.get('[data-testid="day"]')
      .contains("Tuesday")
      .click();
    cy.contains('[data-testid="day"]', "Tuesday")
      .should("have.css", "background-color", "rgb(242, 242, 242)");
  });
});