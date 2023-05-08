import {username, password} from './fixtures.js'
// import LoginPage from '../pageobjects/login.page'
// import ApplicationsPage from '../pageobjects/applications.page'

describe('Czechitas Login Page', async () => {

    it('should open login page', async () => {

        await browser.reloadSession();

        await browser.url('/prihlaseni');
        
        // najdi políčka email a password

        const emailField = $('#email');
        console.log(await emailField.getHTML());

        const passwordField = $('#password');
        console.log(await passwordField.getHTML());
        
        // jsou políčka email a password displayed a enabled?
        console.log('Email field is displayed: ' + await emailField.isDisplayed());
        console.log('Password field is displayed: ' + await passwordField.isDisplayed());
        console.log('Email field is enabled: ' + await emailField.isEnabled());
        console.log('Password field is enabled: ' + await passwordField.isEnabled());

        // najdi tlačítko pro přihlášení a vypiš jeho text pomocí getText

        const btnLogIn = $('.btn-primary');
        console.log('Login button text: ' + await btnLogIn.getText());

        // najdi odkaz a vypiš hodnotu jeho atributu href
        console.log('Zapomněl jsi heslo? Here you go: ' + await $('.btn-link').getAttribute('href'));

        // přihlásit se do aplikace, použij setValue a click

        await emailField.setValue('da-app.admin@czechitas.cz');
        await passwordField.setValue('Czechitas123');
        await btnLogIn.click();

        // Vypiš jméno přihlášeného uživatele
        
        const currentUser = $('.navbar-right').$('strong');
        /* const currentUser = $('.navbar-right strong') */
        console.log(await currentUser.getText());

        // klikni na přihlášky

        await $('=Přihlášky').click();

        // najdi všechny řádky tabulky s přihláškami, vypiš počet řádků a text každého řádku
        const rows = await $('.dataTable').$('tbody').$$('tr');
        console.log('Tabulka obsahuje ' + rows.length + ' řádků');

        for await (const row of rows) {
            console.log(await row.getText())
        };

        //BONUS - vyplňte něco do políčka 'hledat' a opět vypište všechny řádky
        
       

        await browser.pause(5000);

    });

});
