import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'teacher',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
        // canActivate: [AuthGuard],
    },
    {
        path: 'teacher',
        loadChildren: () => import('./modules/teacher/teacher.module').then(m => m.TeacherModule),
        // canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}