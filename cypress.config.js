const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    experimentalOriginDependencies: true,
    setupNodeEvents(on, config) {
      // Check if the required environment variables are present
      if (!process.env.CYPRESS_EMAIL || !process.env.CYPRESS_PASSWORD) {
        throw new Error(
          "CYPRESS_EMAIL or CYPRESS_PASSWORD are not defined in the .env file"
        );
      }

      // Assign environment variables to Cypress config
      config.env.email = process.env.CYPRESS_EMAIL;
      config.env.password = process.env.CYPRESS_PASSWORD;

      // Set the Mochawesome reporter options
      config.reporter = "mochawesome";
      config.reporterOptions = {
        reportDir: "cypress/reports", // Save reports in this directory
        overwrite: false, // Don't overwrite previous reports
        html: true, // Generate an HTML report
        json: true, // Generate a JSON report
      };

      return config;
    },
  },
});
