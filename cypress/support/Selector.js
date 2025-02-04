export const Selector = {
  //Login Page
  usernameField: "#username",
  passwordField: "#password",
  ProductNameField: 'input[data-id="product_name_input"]',
  Description: '[data-id="product_description_input"]',
  SearchField: "#Includes",
  loginButton: '[type="submit"]',
  AddProductButton: '[data-id="add_product_button"]',
  AddProductSubmitButton: '[data-id="add_product_submit_button"]',
  LoginError: '[data-error-code="wrong-email-credentials"]',
  InputError: "p.text-red-800",

  //Dashboard
  Product: '[data-id="navigation_item_2"]',
  HelpButton: '[data-id="help_button"]',

  //Product tab
  AddProductButton: '[data-id="add_product_button"]',
  AddProductSubmitButton: '[data-id="add_product_submit_button"]',
  ProductNameField: 'input[data-id="product_name_input"]',
  Description: '[data-id="product_description_input"]',
  SearchField: "#Includes",
  FirstItem: "tbody>tr:first-child>td:first-child>a",
  KebabMenuFirst: 'tbody>tr:first-child>td:last-child>.flex>[type="button"]',
  ViewEditDeleteOption: '[role="menuitem"]',
  AllProduct: "tbody>tr>td:first-child>a",
  PopupMessage: ".text-white",

  // Project tab
  tabs: 'button[role="tab"]',
  AddProjectButton: 'button[data-id="add_project_button"]',
  ProjectNameField: '[data-id="project_name_input"]',
  DevelopmentEnvironment: '[data-id="toggle_group_development"]',
  SaveandContinueButton: '[data-id="save_project_button"]',
  ProjectDescription: '[data-id="project_description_input"]',
  GitHubButton: '[data-id="source_code_type_github',
  CompleteSetupButton: '[data-id="continue_button"]',
  GitHubUrlFeild: '[data-id="github_repo_url_input_1"]',
  SBOMFileUploadButton: '[data-id="source_code_type_upload_sbom"]',
  AllProject: "tr>td:first-child>a",
  VersionField: "input#Version",

  // Artifact
  Artifact: '[data-id="navigation_item_3"]',
  AddArtifactButton: ".px-6>span",
  ArtifactFormSubmitButton: 'button[type="submit"]',

  //Reports
  Reports: '[data-id="navigation_item_4"]',

  // Settings
  Settings: '[data-id="navigation_item_5"]',
  SettingsOptions: ".mt-4>button",
  AddPolicyButton: "button>span.text-xl.text-white",
  FirstPolicy: "tbody>tr:first-child>>button",
  crossIcon: ".pt-2>span",
  RedButton: ".bg-danger-color",
  FirstPolicy: "tbody > tr:first-child button",
};
