/// <reference types="cypress" />
import "cypress-file-upload";
import { Selector } from "../../../support/Selector";

describe("Dashboard", () => {
  beforeEach(() => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");
    cy.visitAppPage();
    cy.performLogin(email, password);
    cy.validateLogin();

    cy;
  });

  it("Validate Vulnerability Count accuracy of the dashboard", () => {
    cy.get("p.text-red-500")
      .eq(0)
      .invoke("text")
      .then((value) => {
        const numericValue = parseInt(value.trim(), 10);
        cy.NavigateReports();
        cy.get('[href="/reports/vulnerabilities"]').click();
        cy.get("p.text-xs").contains(numericValue);
      });
  });
  it("Validate Vulnerable Package Count accuracy of the dashboard", () => {
    cy.get("p.text-red-500")
      .eq(2)
      .invoke("text")
      .then((value) => {
        const numericValue = parseInt(value.trim(), 10);
        cy.NavigateReports();
        cy.get('[href="/reports/vulnerable-packages"]').click();
        cy.get("p.text-xs").contains(numericValue);
      });
  });

  it("Validate Support and Document button", () => {
    cy.get(Selector.HelpButton).invoke("removeAttr", "target").click();
    cy.url().should(
      "include",
      "https://app.invisirisk.com/documentation/109051923"
    );
  });
});
