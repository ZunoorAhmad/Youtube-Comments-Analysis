import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ReportsComponent } from './components/reports/reports.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'teacher-dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: TeacherComponent,
        children: [
            {
                path: 'profile',
                component: ProfileComponent,
            },
            {
                path: 'teacher-dashboard',
                component: TeacherDashboardComponent,
            },
            {
                path: 'overview',
                component: OverviewComponent,
            },
            {
                path: 'reports',
                component: ReportsComponent,
            },
            {
                path: 'profile',
                component: ProfileComponent,
            },
            {
                path: 'terms-and-conditions',
                component: TermsAndConditionsComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TeacherRoutingModule { }
