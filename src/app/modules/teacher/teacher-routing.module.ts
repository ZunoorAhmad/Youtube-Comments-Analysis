import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { TeacherComponent } from './components/teacher/teacher.component';

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
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TeacherRoutingModule { }
