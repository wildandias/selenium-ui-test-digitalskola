const { By } = require('selenium-webdriver');

class CartPage {
    constructor(driver) {
        this.driver = driver;
        this.cartButton = By.xpath("//a[@class='shopping_cart_link']");
        this.cartItem = By.className('cart_item');
        this.checkoutButton = By.xpath("//button[@class='btn_action']");
    }

    // Navigasi ke halaman cart
    async goToCart() {
        await this.driver.findElement(this.cartButton).click();
    }

    // Memastikan ada item di cart
    async itemInCart() {
        const items = await this.driver.findElements(this.cartItem);
        return items.length > 0; // Mengembalikan true jika ada item
    }

    // Menyelesaikan checkout
    async proceedToCheckout() {
        await this.driver.findElement(this.checkoutButton).click();
    }
}

module.exports = CartPage;
