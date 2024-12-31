import {
    SocialLoginModule,
    GoogleSigninButtonModule,
    GoogleLoginProvider,
    SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { environment } from 'src/environments/environment';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RegisterComponent } from './register/register.component';
import { PasswordModule } from 'primeng/password';
import { AuthService } from './services/auth.service';
import { AvatarModule } from 'primeng/avatar';
import { CheckboxModule } from 'primeng/checkbox';

export const defaultDeclarations = [
    LoginComponent,
    AuthComponent,
    RegisterComponent,
];

export const defaultImports = [
    CommonModule,
    CardModule,
    RadioButtonModule,
    AuthRoutingModule,
    SocialLoginModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    GoogleSigninButtonModule,
    CardModule,
    AvatarModule,
    CheckboxModule,
];

export const defaultProviders = [
    AuthService,
    {
        provide: 'SocialAuthServiceConfig',
        useValue: {
            autoLogin: false,
            providers: [
                {
                    id: GoogleLoginProvider.PROVIDER_ID,
                    provider: new GoogleLoginProvider(environment.googleClientId, {
                        prompt: 'none',
                        oneTapEnabled: false,
                        scopes: 'https://www.googleapis.com/auth/userinfo.profile',
                    }),
                },
            ],
            onError: err => {},
        } as SocialAuthServiceConfig,
    },
];
