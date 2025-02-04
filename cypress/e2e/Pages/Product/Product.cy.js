/// <reference types="cypress" />
import { Selector } from "../../../support/Selector";

describe("Product Management", () => {
  beforeEach(() => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");
    cy.visitAppPage();
    cy.performLogin(email, password);
    cy.validateLogin();
  });

  it("Validate Adding a Product", () => {
    const productName =
      "DemoProduct" + Math.floor(10000 + Math.random() * 90000);
    cy.get(Selector.Product).click();
    cy.get(Selector.AddProductButton).click();
    cy.get(Selector.ProductNameField).type(productName);
    cy.get(Selector.AddProductSubmitButton).click();
    cy.get(Selector.FirstItem).should("have.text", productName);
  });
  it("validate Deleting a product", () => {
    cy.get(Selector.Product).click();
    cy.get(Selector.FirstItem)
      .invoke("text")
      .then((DeleteProduct) => {
        cy.log("Deleting Product", DeleteProduct);
        cy.get("tbody>tr:first-child")
          .find('[type="button"] > button > span.text-2xl')
          .click();
        cy.get(Selector.ViewEditDeleteOption)
          .contains("Delete")
          .should("be.visible")
          .click();
        cy.get('[role="dialog"]>.flex>button')
          .contains("Delete")
          .should("be.visible")
          .click();

        cy.get(Selector.PopupMessage).should("contain", "has been deleted");

        cy.get(Selector.FirstItem)
          .invoke("text")
          .should("not.equal", DeleteProduct);
      });
  });

  it("Validate Export SBOM functionality", () => {
    cy.NavigateProductList();
    cy.get(Selector.AllProduct).contains("Automation Product").click();
    cy.get(Selector.tabs).contains("SBOMs").click();
    cy.get(Selector.KebabMenuFirst).click();
    cy.get('[role="menuitem"]').click();
    cy.contains("SPDX JSON").click({ force: true });
    cy.get(Selector.PopupMessage)
      .contains("Downloading SBOM Started")
      .should("be.visible");
  });

  it("Validate adding Policy in Product level", () => {
    cy.get(Selector.Product).click();
    cy.get(Selector.FirstItem).click();
    cy.get(Selector.tabs).contains("Settings").click();
    cy.AddPolicy();
  });
});
