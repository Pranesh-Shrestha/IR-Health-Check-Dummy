import { Selector } from "./Selector";
 
Cypress.Commands.add("visitAppPage", () => {
  cy.visit("https://app.invisirisk.com/");
});
 
Cypress.Commands.add("performLogin", (username, password) => {
  cy.url().should("include", "auth.invisirisk.com");
 
  cy.get(Selector.usernameField).should("be.visible").type(username);
  cy.get(Selector.passwordField).should("be.visible").type(password);
 
  // Click the login button
  cy.get(Selector.loginButton).should("be.visible").click();
 
  // Optionally, wait for the next page to load (e.g., dashboard)
  // cy.url().should("include", "/dashboard"); // Adjust the URL as needed
});
 
Cypress.Commands.add("invalidEmail", () => {
  return Cypress.Promise.resolve(
    `${Math.random().toString(36).substring(2, 10)}@example.com`
  );
});
 
Cypress.Commands.add("invalidPassword", (length = 10) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  return Cypress.Promise.resolve(
    Array.from(
      { length },
      () => characters[Math.floor(Math.random() * characters.length)]
    ).join("")
  );
});
 
Cypress.Commands.add("validateErrorMessage", () => {
  cy.get(Selector.LoginError)
    .should("be.visible")
    .and("contain.text", "Wrong email or password");
});
 
Cypress.Commands.add("validateLogin", () => {
  // Wait for redirect and app load
  cy.url().should("include", "https://app.invisirisk.com");
  // Add timeout for app to load
  cy.get("button>.flex>.text-start", { timeout: 10000 })
    .should("be.visible")
    .contains("Automation")
    .click();
  cy.log("Login successful and redirected to the app dashboard");
});
 
Cypress.Commands.add("NavigateProject", () => {
  cy.get(Selector.Product).should("be.visible").click();
  cy.get(Selector.FirstItem).should("be.visible").click();
  cy.get(Selector.tabs).should("be.visible").contains("Projects").click();
});
 
Cypress.Commands.add("NavigateProductList", () => {
  // Add visibility checks
  cy.get(Selector.Product).click();
});
Cypress.Commands.add(
  "uploadFile",
  (filePath, mimeType = "application/octet-stream") => {
    cy.get('.file-upload-area input[type="file"], input[type="file"]')
      .should("exist")
      .attachFile(
        {
          filePath: filePath,
          mimeType: mimeType,
        },
        {
          force: true,
          subjectType: "input",
        }
      );
  }
);
 
Cypress.Commands.add("fillArtifactForm", (name, artifactTypeId, filePath) => {
  cy.get('input[id="Artifact Name"]').type(name);
  cy.get('select[name="artifactTypeId"]').select(artifactTypeId, {
    force: true,
  });
  cy.get('.file-upload-area input[type="file"], input[type="file"]').attachFile(
    {
      filePath: filePath,
      mimeType: "text/plain",
    },
    {
      force: true,
      subjectType: "input",
    }
  );
});
 
Cypress.Commands.add("NavigatePolicy", () => {
  cy.get(Selector.Artifact).click();
  cy.get("p.text-start").eq(3).click();
});
Cypress.Commands.add("NavigateReports", () => {
  cy.get(Selector.Reports).click();
});
Cypress.Commands.add("NavigateSettings", () => {
  cy.get(Selector.Settings).click();
});
 
Cypress.Commands.add("AddPolicy", () => {
  cy.get(Selector.AddPolicyButton).click();
  cy.get(Selector.FirstPolicy)
    .parents("tr")
    .find('input[type="checkbox"]')
    .check({ force: true });
  cy.get("button").contains("Save Selected").click();
 
  cy.get(Selector.PopupMessage).contains(
    "PolicyEntityMapping has been created."
  );
  cy.wait(3000);
  cy.get(Selector.crossIcon).click();
  cy.get(Selector.RedButton).click();
});
