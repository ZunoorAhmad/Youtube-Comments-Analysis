import { environment } from 'src/environments/environment';
import { teacherMount } from '../../TeacherMount';
import { TeacherDashboardComponent } from './teacher-dashboard.component';

Cypress.Commands.add('mount', teacherMount);

describe('TeacherDashboardComponent Tests', () => {
    beforeEach('mount TeacherDashboardComponent', () => {
        cy.mount(TeacherDashboardComponent);
    });

    it('should check if the heading is visible', () => {
        cy.get('h2').should('be.visible');
    });

    it('should find the Create New Class button', () => {
        cy.get('button').contains('Create New Class').should('be.visible');
    });

    it('Get Classes Info', () => {
        cy.request('GET', environment.baseUrl + 'classes/count/123')
            .its('status')
            .should('equal', 200);
    });

    it('Get Students of class', () => {
        cy.request({
            method: 'GET',
            url: environment.baseUrl + 'classes/get_class_students_by_teacher/123?status=Pending',
            headers: {
                // Authorization: 'Token 13e2a4d1b3dc2826d9c887c10d1daeab52cfbe6d',
                // Authorization: Cypress.env('teacherToken'),
                Authorization: Cypress.env('teacherToken'),
            },
        })
            .its('status')
            .should('equal', 200);
    });

    it('Get Sessions for teacher', () => {
        cy.request({
            method: 'GET',
            url: environment.baseUrl + 'class-batch-sessions?batchId=171,172,182,187,202,211',
            headers: {
                // Authorization: 'Token 13e2a4d1b3dc2826d9c887c10d1daeab52cfbe6d',
                Authorization: Cypress.env('teacherToken'),
            },
        })
            .its('status')
            .should('equal', 200);
    });
});
