import {username, password} from '../fixtures.js'

describe('Should log in', async () => {

    beforeEach (async () => {
        await browser.reloadSession();
        await browser.url('/registrace');
    });

    afterEach(async () => {
        await browser.pause(5000);
    });

    it('should log in', async () => {

        const nameField = $('#name');
        const emailField = $('#email');
        const passwordField = $('#password');
        const passwordConfirmField = $('#password-confirm');
        const loginButton = $('.btn-primary');

        await nameField.setValue('Eliška Krásná');
        await emailField.setValue(username);
        await passwordField.setValue(password);
        await passwordConfirmField.setValue(password);
        await loginButton.click();

    });

});