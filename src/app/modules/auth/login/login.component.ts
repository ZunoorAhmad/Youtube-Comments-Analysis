import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
    user: any = {}; //user's credentials
    roomName = ''; //room related information
    actionChoice = ''; // save the action (create room/join room)
    subscription: Subscription = new Subscription();
    selectedRole: any = 'teacher'; // save the user role (teacher/student)
    isSignIn = false; // show the asl-google-signin-button if not sign in
    credentials: any = {};

    constructor(
        public global: GlobalService,
        private http: HttpService
    ) {}

    ngOnInit(): void {
        try {
            let credentials = this.global.getStorage('credentials');
            if (credentials) {
                this.credentials = credentials;
            }
        } catch (err) {
            // this.global.openDialog(ErrorDialogComponent, { text: err.message });
        }
    }

    /**
     * Add observer for Google Authentication when user successfully logged in
     * through gmail account and save informatin to local storage.
     * Request backend to get validated from backend and get access token from twilio to join the meeting room
     */
    onSignIn(role: string) {
        try {
            this.global.setObservable('isLoading', true);
            if (this.credentials.idToken) {
                this.http
                    .post(environment.baseUrl + 'signup', {
                        email: this.credentials.email,
                        firstName: this.credentials.firstName,
                        lastName: this.credentials.lastName,
                        password: this.credentials.password,
                        idToken: this.credentials.idToken,
                        role: role,
                    })
                    .then((user: any) => {
                        this.postSuccess(user);
                    })
                    .catch(err => {
                        this.global.setObservable('isLoading', false);
                        if (err.message.includes('Email is already taken')) {
                            this.global.goToPage('/auth/sign-in');
                        }
                        // this.global.openDialog(ErrorDialogComponent, { text: err.message });
                    });
            } else {
                this.http
                    .post(environment.baseUrl + 'email_signup', {
                        email: this.credentials.email,
                        password: this.credentials.password,
                        role: role,
                    })
                    .then((user: any) => {
                        this.postSuccess(user);
                    })
                    .catch(err => {
                        this.global.setObservable('isLoading', false);
                        // this.global.openDialog(ErrorDialogComponent, { text: err.message });
                    });
            }
        } catch (err) {
            // this.global.openDialog(ErrorDialogComponent, { text: err.message });
        }
    }

    postSuccess(user) {
        this.global.openSnackBar('You have registered succesfully');
        this.global.setStorage('user', user);
        this.global.setStorage('userId', user.id);
        this.global.setStorage('authToken', user['token']);
        // this.global.goToPage(
        //     user.role == Role.student
        //         ? '/student/student-profile-initial'
        //         : user.role == Role.teacher
        //           ? '/teacher/class-setup'
        //           : '/admin'
        // );
        this.global.setObservable('isLoading', false);
        this.global.setStorage('credentials', null);
    }

    /**
     * Unsubscribe the Google Authentication when user will leave login page.
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
