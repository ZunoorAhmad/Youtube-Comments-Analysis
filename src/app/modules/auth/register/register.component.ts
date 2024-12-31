import { Component, inject, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import {
    FormControl,
    Validators,
    AbstractControlOptions,
    ValidatorFn,
    AbstractControl,
    ValidationErrors,
    FormBuilder,
    FormGroup,
} from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
    fb = inject(FormBuilder);
    signupForm: FormGroup;

    constructor(public globalService: GlobalService) {
        this.signupForm = this.fb.group(
            {
                email: new FormControl('', [
                    Validators.required,
                    Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
                ]),
                password: new FormControl('', [Validators.required, Validators.minLength(6)]),
                confirmPassword: new FormControl(''), // Updated this key
            },
            { validators: this.PasswordValidator } as AbstractControlOptions
        );
    }

    get formControl() {
        return this.signupForm.controls;
    }

    PasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | Boolean => {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword'); // Updated this key
        if (password && confirmPassword && password.value !== confirmPassword.value) {
            return { passwordmatcherror: true };
        }
        return false;
    };

    ngOnInit(): void {
        return;
    }

    async signup() {
        try {
            await this.globalService.setStorage('credentials', {
                email: this.signupForm.value.email,
                password: this.signupForm.value.password,
            });
            this.globalService.goToPage('/auth/login');
        } catch (error) {
            this.globalService.setObservable('isLoading', false);
        }
    }
}
