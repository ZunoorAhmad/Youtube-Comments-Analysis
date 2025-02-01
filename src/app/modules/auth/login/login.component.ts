import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    errorMessage: string = '';

    constructor(
        private fb: FormBuilder,
        private http: HttpService,
        public globalService: GlobalService
    ) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],  // Ensures a proper email format
            password: ['', Validators.required]
        });
    }

    onSubmit(): void {
        console.log("submit form function")
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }
        const loginData = this.loginForm.value;
        this.http.post(environment.baseUrl + '/signin', loginData).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.error('Login error:', err);
            this.errorMessage = err.error.message || 'Login failed. Please try again.';
        })
    }
}