const { Builder } = require("selenium-webdriver");
const LoginPage = require("./WebComponent/LoginPage");
const DashboardPage = require("./WebComponent/DashboardPage");
const fs = require("fs");
const assert = require("assert");

const screenshotDir = "./screenshots";
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

describe("TestCase1", function () {
  this.timeout(40000);

  let driver;
  let loginPage;
  let dashboardPage;

  // Setup yang dijalankan sekali sebelum semua tes dimulai
  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    loginPage = new LoginPage(driver);
    dashboardPage = new DashboardPage(driver);
  });

  // Hook yang dijalankan sebelum setiap tes
  beforeEach(async function () {
    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
  });

  // Tes untuk login dan verifikasi dashboard
  it("Login successfully and verify dashboard", async function () {
    const title = await dashboardPage.isOnDashboard();
    assert.strictEqual(
      title,
      "Products",
      "Expected dashboard title to be Products"
    );
  });

  afterEach(async function() { const screenshot = await driver.takeScreenshot(); const filepath = `${screenshotDir}/${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`; 
    fs.writeFileSync(filepath, screenshot, 'base64'); });

  after(async function () {
    await driver.quit();
  });
});
