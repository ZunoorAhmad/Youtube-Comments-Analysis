import { environment } from 'src/environments/environment';
import { authMount } from '../authMount';
import { LoginComponent } from './login.component';

Cypress.Commands.add('mount', authMount);

describe('LoginComponent', () => {
    it('check h1', () => {
        cy.get('h1').should('be.visible');
    });
    it('Login', () => {
        cy.log('Logging in to Google');
        cy.get('#login-btn')
            .click({ force: true })
            .then(res => {
                cy.request({
                    method: 'GET',
                    url: 'https://www.googleapis.com/oauth2/v3/userinfo',
                    headers: { Authorization: `Bearer ${Cypress.env('googleAccessToken')}` },
                }).then((response: any) => {
                    expect(response.status).to.eq(200);
                    const body = response.body;
                    cy.log(JSON.stringify(body));
                    const userItem = {
                        token: Cypress.env('googleIdToken'),
                        user: {
                            googleId: body.sub,
                            email: body.email,
                            givenName: body.given_name,
                            familyName: body.family_name,
                            imageUrl: body.picture,
                        },
                    };
                    window.localStorage.setItem('googleCypress', JSON.stringify(userItem));
                    cy.request({
                        method: 'POST',
                        url: environment.baseUrl + 'login',
                        body: {
                            email: userItem.user.email,
                            password: userItem.user.googleId,
                            idToken: userItem.token,
                        },
                    }).then((res: any) => {
                        expect(res.body.success).to.equal(true);
                        const data = res.body.data;
                        window.localStorage.setItem('apiToken', JSON.stringify(data.token));
                        window.localStorage.setItem('user', JSON.stringify(data));
                    });
                });
            });

        // cy.request({
        //     method: 'POST',
        //     url: 'https://www.googleapis.com/oauth2/v2/token',
        //     body: {
        //         grant_type: 'refresh_token',
        //         client_id: Cypress.env('googleClientId'),
        //         client_secret: Cypress.env('googleClientSecret'),
        //         refresh_token: Cypress.env('googleRefreshToken'),
        //     },
        // }).then(({ body }) => {
        // cy.log(JSON.stringify(body))
        // const { access_token, id_token } = body

        // cy.visit('/')
        // })
    });

    beforeEach(() => {
        cy.mount(LoginComponent);
    });
});
