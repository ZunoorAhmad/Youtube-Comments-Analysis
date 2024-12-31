import { Injectable } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpService } from '../../../services/http.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user: any = {}; //user's credentials
    subscription: Subscription = new Subscription();

    constructor(
        public socialAuthService: SocialAuthService,
        public globalService: GlobalService,
        private httpService: HttpService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.onSignIn();
        this.logout();
    }

    onSignIn() {
        try {
            this.subscription = this.socialAuthService.authState.subscribe(async (user: any) => {
                if (this.router.url.includes('register')) {
                    await this.globalService.setStorage('credentials', {
                        email: user.email,
                        password: user.id,
                        idToken: user.idToken,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    });
                    this.globalService.goToPage('/auth/login');
                } else if (this.router.url.includes('sign-in') || this.router.url.includes('dashboard')) {
                    this.globalService.setObservable('isLoading', true);
                    this.httpService
                        .post(environment.baseUrl + 'login', {
                            email: user.email,
                            password: user.id,
                            idToken: user.idToken,
                        })
                        .then((user: any) => {
                            this.success(user);
                        })
                        .catch(err => {
                            this.globalService.setObservable('isLoading', false);
                            // this.globalService.openDialog(ErrorDialogComponent, { text: err.message });
                        });
                } else if (this.router.url.includes('auth/invitation')) {
                    let guid: string = '';
                    this.activatedRoute.queryParamMap.subscribe(params => {
                        guid = params.get('guid');
                    });
                    const body: any = {
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        password: user.id,
                        idToken: user.idToken,
                        // role: Role.student,
                    };
                    if (guid) {
                        body.guid = guid;
                    }
                    this.httpService
                        .post(environment.baseUrl + 'signup', body)
                        .then((user: any) => {
                            this.success(user, 'invitation');
                        })
                        .catch(err => {
                            this.globalService.setObservable('isLoading', false);
                            if (err.message.includes('Email is already taken')) {
                                this.globalService.goToPage('/auth/sign-in');
                            }
                            // this.globalService.openDialog(ErrorDialogComponent, { text: err.message });
                        });
                }
            });
        } catch (err) {
            // this.globalService.openDialog(ErrorDialogComponent, { text: err.message });
        }
    }

    success(user, type: string = 'google') {
        this.globalService.openSnackBar('Logged in succesfully');
        this.globalService.setStorage('user', user);
        this.globalService.setStorage('userId', user.id);
        this.globalService.user['token'] = user['token'];
        // this.globalService.goToPage(
        //     user.role == Role.student ? '/student' : user.role == Role.teacher ? '/teacher/teacher-dashboard' : '/admin'
        // );
        this.globalService.setObservable('isLoading', false);
        if (type == 'invitation') {
            this.acceptInvite(user.id);
        }
    }

    acceptInvite(userId: any) {
        const classId = this.activatedRoute.snapshot.paramMap.get('classId');
        if (classId) {
            const body = { studentId: userId, classId: classId };
            this.httpService
                .post(environment.baseUrl + 'class-batch-students/accept-invite', body)
                .then(() => {
                    this.globalService.openSnackBar('Invite Accepted successfully');
                })
                .catch(er => {});
        }
    }

    logout() {
        this.globalService.getObservable('isLogout').subscribe(res => {
            if (res) {
                this.socialAuthService.signOut(true);
            }
        });
    }
}
