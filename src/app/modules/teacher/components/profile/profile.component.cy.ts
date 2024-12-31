import { ProfileComponent } from 'src/app/modules/teacher/components/profile/profile.component';
import { environment } from 'src/environments/environment';
import { teacherMount } from '../../TeacherMount';

Cypress.Commands.add('mount', teacherMount);

describe('ProfileComponent', () => {
    it('check h1', () => {
        cy.get('h1').should('be.visible');
    });

    it('Post Call', () => {
        cy.request({
            method: 'POST',
            url: environment.baseUrl + 'teacher-subjects/insert',
            headers: {
                Authorization: Cypress.env('apiToken'),
            },
            body: {
                id: '',
                subjectId: '2',
                teacherId: '51',
            },
        });
    });

    it('find button', () => {
        cy.get('p-button').contains('Update Your Teacher Profile').as('SaveButton');
    });

    beforeEach(() => {
        cy.mount(ProfileComponent);
    });

    it('Get Subjects', () => {
        cy.request('GET', environment.baseUrl + 'subjects')
            .its('status')
            .should('equal', 200);
    });

    it('form values validation and testing', () => {
        cy.log(window.localStorage.getItem('user'));
        cy.window().should('have.property', 'GlobalService');
        cy.window().then((w: any) => {
            cy.log(w.GlobalService);
        });
        cy.contains('Update Your Teacher Profile').click();
        cy.get('[data-cy="userInfoForm"]').should('be.visible');
        cy.get('#firstName').type('Waleed');
        cy.get('#lastName').type('Khan');
        // email will not be filled because it is no editable
        // cy.get('#email').type('wkhs147@gmail.com');
        cy.get('#phoneNumber').type('567887');
        cy.contains('Save Changes').click();
    });
});
