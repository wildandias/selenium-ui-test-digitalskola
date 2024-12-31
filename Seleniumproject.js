const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function sauceDemoTest() {
  // Membuat koneksi dengan browser driver
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // 1. Akses halaman login saucedemo.com
    await driver.get("https://www.saucedemo.com/");
    
    // 2. Masukkan username dan password
    await driver.findElement(By.xpath("//input[@id='user-name']")).sendKeys('standard_user');
    await driver.findElement(By.xpath("//input[@id='password']")).sendKeys('secret_sauce');
    
    // 3. Klik tombol login
    await driver.findElement(By.xpath("//input[@id='login-button']")).click();
    
    // 4. Validasi apakah kita berada di dashboard setelah login
    let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
    assert.strictEqual(titleText, 'Swag Labs', "Dashboard title is incorrect.");

    // 5. Validasi menu Burger Button ada
    let menuButton = await driver.findElement(By.xpath("//button[@id='react-burger-menu-btn']"));
    assert.strictEqual(await menuButton.isDisplayed(), true, "Menu Button is not visible");

    // 6. Tambahkan item ke keranjang
    await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']")).click();

    // 7. Validasi item berhasil ditambahkan ke keranjang
    let cartBadge = await driver.findElement(By.xpath("//span[@class='shopping_cart_badge']")).getText();
    assert.strictEqual(cartBadge, '1', "Item was not added to the cart");

  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    // Menutup browser setelah selesai
    await driver.quit();
  }
}

sauceDemoTest();
