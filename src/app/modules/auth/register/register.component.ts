import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    errorMessage: string = '';

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        }, { validator: this.passwordMatchValidator });
    }

    passwordMatchValidator(formGroup: AbstractControl) {
        const password = formGroup.get('password')?.value;
        const confirmPassword = formGroup.get('confirmPassword')?.value;
        return password === confirmPassword ? null : { mismatch: true };
    }

    onSubmit(): void {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
            return;
        }
        const registerData = {
            email: this.registerForm.value.email,
            password: this.registerForm.value.password
        };
        this.http.post('/api/register', registerData).subscribe({
            next: (response: any) => {
                console.log(response);
                this.router.navigate(['/welcome']);
            },
            error: (error) => {
                console.error('Registration error:', error);
                this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
            }
        });
    }
}