import {username, password} from './fixtures.js'

// import LoginPage from '../pageobjects/login.page'
// import ApplicationsPage from '../pageobjects/applications.page'

describe('login', async () => {

    beforeEach (async () => {
        await browser.reloadSession();
        await browser.url('/prihlaseni');
    });

    afterEach(async () => {
        await browser.pause(5000);
    });
        
    it('should show login form', async () => {
        const emailField = $('#email');
        console.log('Email field is dislayed: ' + await emailField.isDisplayed());
        console.log('Email field is dislayed: ' + await emailField.isEnabled());

        const passwordField = $('#password');
        console.log('Password field is dislayed: ' + await passwordField.isDisplayed());
        console.log('Password field is dislayed: ' + await passwordField.isEnabled());

        const loginButton = $('.btn-primary');
        console.log('Login button is dislayed: ' + await loginButton.isDisplayed());
        console.log('Login button text is: ' + await loginButton.getText());
    });

    it('should login with right credentials', async () => {
        const emailField = $('#email');
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');

        await emailField.setValue(username);
        await passwordField.setValue(password);
        await loginButton.click();
        
        const userName = $('.navbar-right').$('[data-toggle="dropdown"]');
        console.log('Momentálně je přihlášený uživatel: ' + await userName.getText());

    });


    it('should not login with wrong password', async () => {
        const emailField = $('#email');
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');

        await emailField.setValue(username);
        await passwordField.setValue('invalid');
        await loginButton.click();

        const toastMessage = $('.toast-message');
        console.log('Error: ' + await toastMessage.getText());

        const fieldError = $('.invalid-feedback');
        console.log('Field error: ' + await fieldError.getText());        

    });

 

    it('log out', async () => {

        const emailField = $('#email');
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');
        const userName = $('.navbar-right').$('[data-toggle="dropdown"]');
        const logoutLink = $('#logout-link');

        await emailField.setValue(username);
        await passwordField.setValue(password);
        await loginButton.click();

        console.log('User currently logged in: ' + await userName.getText());

        await userName.click();
        await logoutLink.click();

        console.log('User is logged in: ' + await userName.isDisplayed());
        console.log('Navbar text: ' + await $('.navbar-right').getText());

    });

});

describe('login', async () => {

    beforeEach(async () => {
        await browser.reloadSession();
        await browser.url('/prihlaseni');
        await $('#email').setValue(username);
        await $('#password').setValue(password);
        await $('.btn-primary').click();
        await $('=Přihlášky').click();
        await browser.pause(1000);
    });

    it('should list all applications', async () => {

        const rows = await $('.dataTable').$('tbody').$$('tr');
        console.log('There are ' + rows.length + ' rows in the table');
        for (const row of rows) {
            const rowText = await row.getText()
            console.log(rowText);
        }
    });

    it('should filter applications', async () => {

        const searchInput = $('input[type="search"]');
        const searchText = 'Karel';

        await searchInput.setValue(searchText);
        await browser.pause(1000);

        const filteredRows = await $('.dataTable').$('tbody').$$('tr')
        console.log('There are ' + filteredRows.length + ' filtered rows in the table');
        for (const row of filteredRows) {
            console.log(await row.getText());
        }
        
    });
});


