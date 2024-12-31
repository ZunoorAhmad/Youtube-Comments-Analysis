import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from 'src/app/guards/no-auth.guard';
import { AuthComponent } from 'src/app/modules/auth/auth/auth.component';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: '',
                redirectTo: 'sign-in',
                pathMatch: 'full',
            },
            {
                path: 'login',
                component: LoginComponent,
                canActivate: [NoAuthGuard],
            },
            {
                path: 'register',
                component: RegisterComponent,
                canActivate: [NoAuthGuard],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
