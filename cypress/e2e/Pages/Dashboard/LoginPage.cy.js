/// <reference types="cypress" />

describe("InvisiRisk Login Page - Authentication Test Suite", () => {
  beforeEach(() => {
    cy.visitAppPage();
  });

  it("Validate error message with invalid credentials", () => {
    // Generate invalid credentials before passing to origin
    cy.invalidEmail().then((email) => {
      cy.invalidPassword().then((password) => {
        cy.performLogin(email, password);
        cy.validateErrorMessage();
      });
    });
  });

  it("Validate successful login with valid credentials", () => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");

    cy.performLogin(email, password);
    cy.url().should("include", "https://app.invisirisk.com");
    cy.validateLogin();
  });

  it("Verify logout functionality and redirection to authentication page", () => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");

    // Login first
    cy.performLogin(email, password);
    cy.validateLogin();
    cy.get('[data-id="account_menu"]').should("be.visible").click();
    cy.get('[role="menuitem"]').click();
  });

  it("Validate toggle password visibility functionality", () => {
    cy.get("#password").type("i@mdoingF9");
    cy.get("button.ulp-button-icon").click();
    cy.get("#password").should("have.attr", "type", "text");
  });

  it("Verify Forgot Password link navigates to reset password page", () => {
    cy.get("p>a").should("be.visible").click();
    cy.url().should("include", "/reset-password/request/");
  });
});
