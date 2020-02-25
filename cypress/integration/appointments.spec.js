describe("Appointments", () => {
  // prep //
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  // test 1 //
  it("should book an interview", () => {
    cy.get('[alt="Add"]')
      .first()
      .click();
    cy.get('input.appointment__create-input')
      .type('cypress');
    cy.get('[alt="Tori Malcolm"]')
      .click();
    cy.get('button.button--confirm')
      .click();

    cy.contains(".appointment__card--show", "cypress");
    cy.contains(".appointment__card--show", "Tori Malcolm");
    cy.contains("no spots remaining");
  });

  // test 2 //
  it("should edit an interview", () => {
    cy.get('[appointment_id=1]')
      .find('[alt="Edit"]')
      .click({ force: true });
    cy.get('input.appointment__create-input')
      .clear()
      .type('cypress');
    cy.get('button.button--confirm')
      .click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
    cy.contains("1 spot remaining");
  });

  // test 3 //
  it("should cancel an interview", () => {
    cy.get('[appointment_id=1]')
      .find('[alt="Delete"]')
      .click({ force: true });
    cy.contains("Confirm")
      .click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
  });
});