import { Selector } from "../../../support/Selector";
import githublUrl from "../../../fixtures/githublUrl";
import "cypress-file-upload";

const getRandomGitHubUrl = () => {
  const randomIndex = Math.floor(Math.random() * githublUrl.length);
  return githublUrl[randomIndex];
};

describe("Project Management", () => {
  beforeEach(() => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");
    cy.visitAppPage();
    cy.performLogin(email, password);
    cy.validateLogin();
    cy.NavigateProject();
  });

  it("Validating uploading a project with GitHub Scan", () => {
    const projectName =
      "DemoProduct" + Math.floor(10000 + Math.random() * 90000);
    cy.get(Selector.AddProjectButton).click();
    cy.get(Selector.ProjectNameField).type(projectName);
    cy.get(Selector.ProjectDescription).type("Project Description");
    cy.get(Selector.DevelopmentEnvironment).click();
    cy.get(Selector.SaveandContinueButton).click();
    const randomGitHubUrl = getRandomGitHubUrl();
    cy.get(Selector.GitHubButton).click();
    cy.get(Selector.GitHubUrlFeild).clear().type(randomGitHubUrl);
    cy.get(Selector.CompleteSetupButton).click();
    cy.get(Selector.PopupMessage).contains("and Scan has been initiated");
  });
  it("Validating uploading a project with SBOM uploads", () => {
    const projectName =
      "DemoProduct" + Math.floor(10000 + Math.random() * 90000);
    cy.get(Selector.AddProjectButton).click();
    cy.get(Selector.ProjectNameField).type(projectName);
    cy.get(Selector.ProjectDescription).type("Project Description");
    cy.get(Selector.DevelopmentEnvironment).click();
    cy.get(Selector.SaveandContinueButton).click();
    cy.get(Selector.SBOMFileUploadButton,{ timeout: 20000 }).click();
    cy.uploadFile("java.json", "application/json");
    cy.get(Selector.CompleteSetupButton);
  });
});
