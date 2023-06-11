import {username, password, userFullName, expectedApplicationsPageRows} from './fixtures.js'

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
        await expect(emailField).toBeDisplayed();
        await expect(emailField).toBeEnabled();

        const passwordField = $('#password');
        await expect(passwordField).toBeDisplayed();
        await expect(passwordField).toBeEnabled();

        const loginButton = $('.btn-primary');
        await expect(loginButton).toBeDisplayed();
        await expect(loginButton).toHaveText('Přihlásit');
    });

    it('should show forgotten password button with right link', async () => {
        const forgottenPasswordButton = $('.card-body').$('.btn-link');

        await expect(forgottenPasswordButton).toHaveText('Zapomněli jste své heslo?');

        await expect(await forgottenPasswordButton.getAttribute('href')).toEqual('https://team8-2022brno.herokuapp.com/zapomenute-heslo');

    });

    it('should login with valid credentials', async () => {
        const emailField = $('#email');
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');

        await emailField.setValue(username);
        await passwordField.setValue(password);
        await loginButton.click();
        
        const userName = $('.navbar-right').$('[data-toggle="dropdown"]');
        await expect(await userName.getText()).toEqual(userFullName);

    });


    it('should not login with invalid credentials', async () => {
        const emailField = $('#email');
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');

        await emailField.setValue(username);
        await passwordField.setValue('invalid');
        await loginButton.click();

        const toastMessage = $('.toast-message');
        await expect(await toastMessage.getText()).toEqual('Některé pole obsahuje špatně zadanou hodnotu');

        const fieldError = $('.invalid-feedback');
        await expect(fieldError).toBeExisting();      

        await expect(await fieldError.getText()).toEqual('Tyto přihlašovací údaje neodpovídají žadnému záznamu.');

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

        await expect(await userName.getText()).toEqual(userFullName);

        await userName.click();
        await logoutLink.click();

        await expect(await userName.isDisplayed()).toBeFalsy();
        await expect(await $('.navbar-right').getText()).toEqual('Přihlásit');

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
    
        const table = $('.dataTable').$('tbody');
        const rows = await table.$$('tr');

        await expect(await $('h1')).toHaveText('Přihlášky');
        await expect(rows.length).toEqual(expectedApplicationsPageRows);
        
        for (const row of rows) {
            const cols = await row.$$('td');
            /* console.log(await cols[0].getText()); */
            await expect(cols[0]).toHaveText(/^(?!\s*$).+/);
            await expect(cols[1]).toHaveText(/(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/);
            await expect(cols[2]).toHaveText(['Bankovní převod', 'FKSP', 'Hotově', 'Složenka']);
            await expect(cols[3]).toHaveText(/\d{1,3}(| \d{0,3}) Kč/);
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


