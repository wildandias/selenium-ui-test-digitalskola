const { By } = require('selenium-webdriver');

class CheckoutOverviewPage {
    constructor(driver) {
        this.driver = driver;
        this.finishButton = By.id('finish'); // Tombol untuk menyelesaikan checkout
    }

    async finishCheckout() {
        await this.driver.findElement(this.finishButton).click();
    }
}

module.exports = CheckoutOverviewPage;
