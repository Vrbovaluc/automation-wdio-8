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
        console.log('Name field is dislayed: ' + await nameField.isDisplayed());
        console.log('Name field is dislayed: ' + await nameField.isEnabled());

        const emailField = $('#email');
        console.log('Email field is dislayed: ' + await emailField.isDisplayed());
        console.log('Email field is dislayed: ' + await emailField.isEnabled());

        const passwordField = $('#password');
        console.log('Password field is dislayed: ' + await passwordField.isDisplayed());
        console.log('Password field is dislayed: ' + await passwordField.isEnabled());

        const passwordConfirmField = $('#password-confirm');
        console.log('Password field is displayed: ' + await passwordConfirmField.isDisplayed());
        console.log('Password field is displayed: ' + await passwordConfirmField.isEnabled());

        const loginButton = $('.btn-primary');
        console.log('Login button is dislayed: ' + await loginButton.isDisplayed());
        console.log('Login button text is: ' + await loginButton.getText());

    });


    xit('should sign up with valid credentials', async () => {

        const nameField = $('#name');
        const emailField = $('#email');
        const passwordField = $('#password');
        const passwordConfirmField = $('#password-confirm');
        const loginButton = $('.btn-primary');

        await nameField.setValue('Eliška Krásná');
        await emailField.setValue('eliska@email.cz');
        await passwordField.setValue(password);
        await passwordConfirmField.setValue(password);
        await loginButton.click();

        const userNameDropdown = $('.navbar-right').$('[data-toggle="dropdown"]');
        console.log('User currently logged in: ' + await userNameDropdown.getText());

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
        console.log('Your feedback: ' + await invalidFeedback.getText());       
    });

    it.only('should not sign up with numbers only password', async () => {

        const nameField = $('#name');
        const emailField = $('#email');
        const passwordField = $('#password');
        const passwordConfirmField = $('#password-confirm');
        const loginButton = $('.btn-primary');

        await nameField.setValue('Eliška Krásná');
        await emailField.setValue('krasna@seznam.cz');
        await passwordField.setValue('123456');
        await passwordConfirmField.setValue('123456');
        await loginButton.click();

        const invalidFeedback = $('.card-body').$('.invalid-feedback');
        console.log('Your feedback: ' + await invalidFeedback.getText()); 
        
    });

});