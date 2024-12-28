const { By } = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.usernameInput = By.id('user-name');
        this.passwordInput = By.xpath("//input[@id='password']");
        this.loginButton = By.xpath("//input[@id='login-button']");
        this.errorMessage = By.xpath("//h3[@data-test='error']");
    }

    // Navigasi ke halaman login
    async navigate() {
        await this.driver.get("https://www.saucedemo.com/");
    }

    // Login dengan username dan password
    async login(username, password) {
        await this.driver.findElement(this.usernameInput).sendKeys(username);
        await this.driver.findElement(this.passwordInput).sendKeys(password);
        await this.driver.findElement(this.loginButton).click();
    }

    // Mendapatkan pesan error jika login gagal
    async getErrorMessage() {
        const errorElement = await this.driver.findElement(this.errorMessage);
        return errorElement.getText();
    }
}

module.exports = LoginPage;
