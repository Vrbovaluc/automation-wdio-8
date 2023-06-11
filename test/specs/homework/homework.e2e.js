import {username, password} from '../fixtures.js'

describe('Should sign up', async () => {

    before (async () => {
        await browser.reloadSession();
        await browser.url('/registrace');
        
    });

    afterEach(async () => {
        await browser.pause(5000);
    });

    it('should show sing up form', async () => {

        const nameField = $('#name');
        await expect(nameField).toBeDisplayed();
        await expect(nameField).toBeEnabled();
        
        const emailField = $('#email');
        await expect(emailField).toBeDisplayed();
        await expect(emailField).toBeEnabled();

        const passwordField = $('#password');
        await expect(passwordField).toBeDisplayed();
        await expect(passwordField).toBeEnabled();

        const passwordConfirmField = $('#password-confirm');
        await expect(passwordConfirmField).toBeDisplayed();
        await expect(passwordConfirmField).toBeEnabled();

        const loginButton = $('.btn-primary');
        await expect(loginButton).toBeDisplayed();
        await expect(loginButton).toHaveText('Zaregistrovat');

    });


    xit('should sign up with valid credentials', async () => {

        const nameField = $('#name');
        const emailField = $('#email');
        const passwordField = $('#password');
        const passwordConfirmField = $('#password-confirm');
        const loginButton = $('.btn-primary');
        const userFullName = ('Eliška Krásná')

        await nameField.setValue(userFullName);
        await emailField.setValue('eliska@gmail.com');
        await passwordField.setValue(password);
        await passwordConfirmField.setValue(password);
        await loginButton.click();

        const userNameDropdown = $('.navbar-right').$('[data-toggle="dropdown"]');
        await expect(await userNameDropdown.getText()).toEqual(userFullName);       

    });

    it('should not sign up with already existing email', async () => {

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

    
        const invalidFeedback = $('.card-body').$('.invalid-feedback');
        await expect(await invalidFeedback.getText()).toEqual('Účet s tímto emailem již existuje');

    });

    it('should not sign up with numbers only password', async () => {

        const nameField = $('#name');
        const emailField = $('#email');
        const passwordField = $('#password');
        const passwordConfirmField = $('#password-confirm');
        const loginButton = $('.btn-primary');        

        await nameField.setValue('Eliška Krásná');
        await emailField.setValue('krassna@seznam.cz');
        await passwordField.setValue('abcdef');
        await passwordConfirmField.setValue('abcdef');
        await loginButton.click();

        const invalidFeedback = $('.card-body').$('.invalid-feedback');
        console.log('Your feedback: ' + await invalidFeedback.getText());
        
        await expect(await invalidFeedback).toBeExisting(); 
        
    });

});