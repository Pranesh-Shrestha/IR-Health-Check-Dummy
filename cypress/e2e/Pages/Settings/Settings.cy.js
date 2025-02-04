/// <reference types="cypress" />
import { Selector } from "../../../support/Selector";

describe("Settings", () => {
  beforeEach(() => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");
    cy.visitAppPage();
    cy.performLogin(email, password);
    cy.validateLogin();
    cy.NavigateSettings();
  });

  it("Validate Adding a Policy in the Organization level", () => {
    cy.get(Selector.SettingsOptions).contains("Policies").click();
    cy.AddPolicy();
  });
});
