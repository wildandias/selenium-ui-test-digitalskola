const { By } = require('selenium-webdriver');

class CheckoutPage {
    constructor(driver) {
        this.driver = driver;
        this.firstNameInput = By.id('first-name');
        this.lastNameInput = By.id('last-name');
        this.zipCodeInput = By.id('postal-code');
        this.continueButton = By.id('continue');
        this.errorMessage = By.xpath("//h3[@data-test='error']");
    }

    // Isi informasi data diri
    async fillInformation(firstName, lastName, zipCode) {
        await this.driver.findElement(this.firstNameInput).sendKeys(firstName);
        await this.driver.findElement(this.lastNameInput).sendKeys(lastName);
        await this.driver.findElement(this.zipCodeInput).sendKeys(zipCode);
        await this.driver.findElement(this.continueButton).click();
    }

    // Mendapatkan pesan error jika informasi tidak valid
    async getErrorMessage() {
        try {
            const errorElement = await this.driver.findElement(this.errorMessage);
            return await errorElement.getText();
        } catch (error) {
            return null; // Jika elemen tidak ditemukan, kembalikan null
        }
    }
}

module.exports = CheckoutPage;
