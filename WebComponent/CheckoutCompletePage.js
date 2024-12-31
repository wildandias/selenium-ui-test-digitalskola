const { By } = require("selenium-webdriver");

class CheckoutCompletePage {
    constructor(driver) {
        this.driver = driver;
        this.completeMessage = By.xpath("//h2[contains(text(), 'Thank you')]");

    }

    async getCompleteMessage() {
        const element = await this.driver.findElement(this.completeMessage);
        return (await element.getText()).trim(); // Ambil teks dan hapus spasi kosong
    }
}

module.exports = CheckoutCompletePage;
