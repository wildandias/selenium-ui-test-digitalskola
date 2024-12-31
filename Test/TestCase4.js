const { Builder, By } = require("selenium-webdriver"); 
const LoginPage = require("../WebComponent/LoginPage");
const DashboardPage = require("../WebComponent/DashboardPage");
const CartPage = require("../WebComponent/CartPage");
const CheckoutPage = require('../WebComponent/CheckoutPage');
const CheckoutOverviewPage = require('../WebComponent/CheckoutOverviewPage');
const CheckoutCompletePage = require('../WebComponent/CheckoutCompletePage');
const fs = require("fs");
const assert = require("assert");
require('dotenv').config();

const browser = process.env.BROWSER;
const baseURL = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

const screenshotDir = "./screenshots";
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

describe('TestCase4 [login] #Smoke', function () {
  this.timeout(40000);

  let options;
  switch (browser.toLowerCase()) {
    case "firefox":
      const firefox = require("selenium-webdriver/firefox");
      options = new firefox.Options();
      options.addArguments("--headless");
      break;

    case "edge":
      const edge = require("selenium-webdriver/edge");
      options = new edge.Options();
      options.addArguments("--headless");
      break;

    case "chrome":
    default:
      const chrome = require("selenium-webdriver/chrome");
      options = new chrome.Options();
      options.addArguments("--headless");
      break;
  }

  let driver;
  let loginPage;
  let dashboardPage;
  let cartPage;
  let checkoutPage;
  let checkoutOverviewPage;
  let checkoutCompletePage;

  // Setup yang dijalankan sekali sebelum semua tes dimulai
  before(async function () {
    driver = await new Builder()
      .forBrowser(browser)
      .setFirefoxOptions(options) // Ganti sesuai browser
      .build();
      
    loginPage = new LoginPage(driver);
    dashboardPage = new DashboardPage(driver);
    cartPage = new CartPage(driver);
    checkoutPage = new CheckoutPage(driver);
    checkoutOverviewPage = new CheckoutOverviewPage(driver);
    checkoutCompletePage = new CheckoutCompletePage(driver);
  });

  // Hook yang dijalankan sebelum setiap tes
  beforeEach(async function () {
    await loginPage.navigate(baseURL); 
    await loginPage.login(username, password);
  });

  // Tes untuk login dan verifikasi dashboard
  it("User success login", async function () {
    const title = await dashboardPage.isOnDashboard();
    assert.strictEqual(
      title,
      "PRODUCTS",
      "User should be redirected to the dashboard"
    );
  });

  // Tes untuk menambah item ke keranjang
  it('Add item to cart', async function() {
    // Menambahkan item ke keranjang
    const addToCartButton = await driver.findElement(By.xpath("//button[contains(text(), 'Add to cart')]"));
    await addToCartButton.click();

    // Verifikasi item ditambahkan ke keranjang
    await cartPage.goToCart();
    const isItemInCart = await cartPage.itemInCart();
    assert.strictEqual(isItemInCart, true, 'Item should be added to cart');
  });

  it("Checkout process", async function () {
    await cartPage.goToCart();
    await driver.findElement(By.id("checkout")).click();
    await checkoutPage.fillInformation("David", "Jones", "12345");
    await checkoutOverviewPage.finishCheckout();
    const completeMessage = (await checkoutCompletePage.getCompleteMessage()).toUpperCase();
    assert.strictEqual(
        completeMessage,
        "THANK YOU FOR YOUR ORDER!",
        "Checkout process should complete successfully"
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

  after(async function () {
    await driver.quit();
  });
});
