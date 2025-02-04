import { Selector } from "../../../support/Selector";

describe("Project Options", () => {
  beforeEach(() => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");
    cy.visitAppPage();
    cy.performLogin(email, password);
    cy.validateLogin();
    cy.NavigateProductList();
    cy.get(Selector.AllProduct).contains("Automation Product").click();
  });
  it("Validating the Turbo Charge Functionality", () => {
    cy.get(Selector.tabs).contains("Projects").click();
    cy.get(Selector.AllProject).contains("Automation Project").click();
    cy.get(Selector.tabs).contains("Packages").click();
    cy.get("button").contains("Turbo Charge SBOM").click();
    cy.wait(15000);
    cy.get("button>svg.lucide-play").should("be.visible").click();
    cy.get("button>svg").should("be.visible");
  });

  it("Export as SPDX Tag/value", () => {
    cy.get(Selector.tabs).contains("Projects").click();
    cy.get(Selector.AllProject).contains("Automation Project").click();
    cy.get(Selector.tabs).contains("Packages").click();
    cy.get("button").contains("Export").click();
    cy.get('[data-id="dropdown_item_2"]').click();
    cy.get(Selector.PopupMessage)
      .contains("Downloading SBOM Started...")
      .should("be.visible");
  });
  it("Validating Functionality of the Export VEX Report button", () => {
    cy.get(Selector.tabs).contains("Projects").click();
    cy.get(Selector.AllProject).contains("Automation Project").click();
    cy.get(Selector.tabs).contains("Vulnerabilities").click();
    cy.get("button").contains("Export VEX Report").click();
    cy.get(Selector.PopupMessage)
      .contains("VEX Report Download Completed.")
      .should("be.visible");
  });

  it("Validating the mark for publish functionality", () => {
    cy.get(Selector.tabs).contains("Projects").click();
    cy.get(Selector.AllProject).contains("Automation Project 1").click();
    cy.get(Selector.tabs).contains("Packages").click();
    cy.get(".gap-3>button").contains("Mark For Publish").click();
    cy.get(Selector.VersionField).type("1.1.1");
    cy.get('button[type="submit"]').click();
    cy.get(Selector.PopupMessage, { timeout: 15000 }).contains(
      "SBOM has been marked for publish."
    );
    cy.get("button").contains("Unmark").click();
    cy.get("button.bg-danger-color").contains("Unmark").click();
  });
});
