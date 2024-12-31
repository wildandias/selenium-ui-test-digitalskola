const { By } = require('selenium-webdriver');

class DashboardPage {
    constructor(driver) {
        this.driver = driver;
        this.title = By.className('title');
    }

    // Cek apakah kita berada di halaman dashboard
    async isOnDashboard() {
        const titleElement = await this.driver.findElement(this.title);
        const titleText = await titleElement.getText();
        return titleText.trim().toUpperCase();  // Menghilangkan spasi dan memastikan format huruf besar
    }
}

module.exports = DashboardPage;
