/// <reference types="cypress" />
import "cypress-file-upload";
import { Selector } from "../../../support/Selector";

describe("Policy Management", () => {
  beforeEach(() => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");
    cy.visitAppPage();
    console.log(email, password);
    cy.performLogin(email, password);
    cy.validateLogin();
    cy.NavigatePolicy();
  });

  it("Validate Adding Policy", () => {
    cy.get(Selector.AddArtifactButton).click({ force: true });

    const PolicyName = "DemoPolicy" + Math.floor(100 + Math.random() * 900);
    cy.fillArtifactForm(
      PolicyName,
      "60b6a5d1-c92b-400f-a907-07295cd66468",
      "Policy.rego"
    );

    cy.get(Selector.ArtifactFormSubmitButton).click();

    cy.get(Selector.PopupMessage)
      .should("be.visible")
      .contains(`Artifact ${PolicyName} has been added.`);
  });

  it("Validating add Policy From the Scratch", () => {
    const PolicyName = "DemoArtifact" + Math.floor(1000 + Math.random() * 9000);
    cy.get(Selector.AddArtifactButton).click({ force: true });

    cy.get(".underline").should("be.visible").click();
    cy.get('input[name="artifactName"]').should("be.visible").type(PolicyName);
    cy.get('select[name="artifactTypeId"]').select(
      "60b6a5d1-c92b-400f-a907-07295cd66468",
      { force: true }
    );

    cy.get(".gap-6 > .flex > :nth-child(2) > .relative > .absolute")
      .should("be.visible")
      .type("Test.rego");

    cy.get(Selector.ArtifactFormSubmitButton).click();

    cy.get(Selector.PopupMessage)
      .should("be.visible")
      .contains(`${PolicyName} has been added.`);
  });
});
