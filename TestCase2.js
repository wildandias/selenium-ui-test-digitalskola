const { Builder } = require('selenium-webdriver');
const LoginPage = require('./WebComponent/LoginPage');
const DashboardPage = require('./WebComponent/DashboardPage');
const assert = require('assert');

describe('TestCase1', function() {
    this.timeout(40000);  

    let driver;
    let loginPage;
    let dashboardPage;

    // Setup yang dijalankan sekali sebelum semua tes dimulai
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build(); 
        loginPage = new LoginPage(driver);  
        dashboardPage = new DashboardPage(driver);          
    });

    // Hook yang dijalankan sebelum setiap tes
    beforeEach(async function () {
        loginPage = new LoginPage(driver);  
        await loginPage.navigate();  
        await loginPage.login('lala', 'lolo');  
    });

    // Tes untuk login dan verifikasi error message
    it('Error message appears for invalid credentials', async function () {
        loginPage = new LoginPage(driver);  
        const errorMessage = await loginPage.getErrorMessage();
        assert.strictEqual(errorMessage, 'Epic sadface: Username and password do not match any user in this service', 'Expected error message does not match')
    });

    // Cleanup setelah semua tes selesai
    after(async function () {
        await driver.quit();   
    });
});
