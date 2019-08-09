/// <reference types="Cypress" />

const noteBody = "Note Body";
describe("Home", function() {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Creates a Note", function() {
    cy.get("[data-cy=note-form]").should("exist");

    cy.get("[data-cy=note-form-input]").type(noteBody);

    cy.get("[data-cy=note-form-submit]").click();

    cy.get("[data-cy=note-body]").should("contain", noteBody);

    cy.get("[data-cy=note-list]")
      .find("[data-cy=note-list-item]")
      .should("have.length", 1);

    cy.get("[data-cy=note-list-item]");
  });
});
