const { Builder } = require("selenium-webdriver");
const LoginPage = require("../WebComponent/LoginPage");
const DashboardPage = require("../WebComponent/DashboardPage");
const fs = require("fs");
const assert = require("assert");
require("dotenv").config();

const browser = process.env.BROWSER;
const baseURL = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

const screenshotDir = "./screenshots";
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

describe('TestCase2 [login] #Smoke', function () {
  this.timeout(40000);

  let driver;
  let loginPage;
  let dashboardPage;

  switch (browser.toLowerCase()) {
    case "firefox":
      const firefox = require("selenium-webdriver/chrome");
      options = new firefox.Options();
      options.addArguments("--headless");

    case "edge":
      const edge = require("selenium-webdriver/chrome");
      options = new edge.Options();
      options.addArguments("--headless");

    case "chrome":
    default:
      const chrome = require("selenium-webdriver/chrome");
      options = new chrome.Options();
      options.addArguments("--headless");
      break;
  }

  // Setup yang dijalankan sekali sebelum semua tes dimulai
  before(async function () {
    driver = await new Builder()
      .forBrowser(browser)
      .setFirefoxOptions(options)
      .build();
    loginPage = new LoginPage(driver);
    dashboardPage = new DashboardPage(driver);
  });

  // Hook yang dijalankan sebelum setiap tes
  beforeEach(async function () {
    loginPage = new LoginPage(driver);
    await loginPage.navigate(baseURL);
    await loginPage.login("lala", "lolo");
  });

  // Tes untuk login dan verifikasi error message
  it("Error message appears for invalid credentials", async function () {
    loginPage = new LoginPage(driver);
    const errorMessage = await loginPage.getErrorMessage();
    assert.strictEqual(
      errorMessage,
      "Epic sadface: Username and password do not match any user in this service",
      "Expected error message does not match"
    );
  });

  afterEach(async function () {
      const screenshot = await driver.takeScreenshot();
      const filepath = `${screenshotDir}/${this.currentTest.title.replace(
        /\s+/g,
        "_"
      )}_${Date.now()}.png`;
      fs.writeFileSync(filepath, screenshot, "base64");
    });

  // Cleanup setelah semua tes selesai
  after(async function () {
    await driver.quit();
  });
});
