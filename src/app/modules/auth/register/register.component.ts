import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';
import { GlobalService } from 'src/app/services/global.service';

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
        private http: HttpService,
        private globalSerivce: GlobalService
    ) { }

    ngOnInit(): void {
        this.registerForm = this.fb.group({
            username: ['', [Validators.required]],
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
            username: this.registerForm.value.username,
            email: this.registerForm.value.email,
            password: this.registerForm.value.password
        };
        this.http.post(environment.baseUrl + 'signup/', registerData).then((res) => {
            console.log(res);
            this.globalSerivce.setStorage('userInfo', res);
            this.globalSerivce.openSnackBar("User Registered successfully");
            this.globalSerivce.goToPage('/main/home');
        }).catch((err) => {
            console.log(err);
        })
    }
}