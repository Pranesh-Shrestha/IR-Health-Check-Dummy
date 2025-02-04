import { Selector } from "../../../support/Selector";

describe("Project Management", () => {
  beforeEach(() => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");
    cy.visitAppPage();
    cy.performLogin(email, password);
    cy.validateLogin();
    cy.NavigateProject();
  });

  it("Validate adding a Project", () => {
    const projectName =
      "DemoProduct" + Math.floor(10000 + Math.random() * 90000);
    cy.get(Selector.AddProjectButton).click();
    cy.get(Selector.ProjectNameField).type(projectName);
    cy.get(Selector.ProjectDescription).type("Project Description");
    cy.get(Selector.DevelopmentEnvironment).click();
    cy.get(Selector.SaveandContinueButton).click();
    cy.get(Selector.PopupMessage).should(
      "have.text",
      "Project has been created."
    );
  });

  it("Validate Deleting a project", () => {
    cy.wait(8000);
    cy.get(Selector.FirstItem)
      .invoke("text")
      .then((DeleteProject) => {
        cy.log("Deleting Product", DeleteProject);
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
        cy.get(Selector.PopupMessage).contains(
          `Project ${DeleteProject} has been deleted.`
        );
      });
  });

  it("Validating Adding Policy in Project Level", () => {
    cy.get(Selector.FirstItem).click();
    cy.get(Selector.tabs).contains("Settings").click();
    cy.AddPolicy();
  });
});
