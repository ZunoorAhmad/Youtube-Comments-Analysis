import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../services/global.service';

@Injectable({
    providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private global: GlobalService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let authToken: any = this.global.getStorage('authToken');
        let userId: any = this.global.getStorage('userId');
        if (authToken) {
            this.global.authToken = authToken;
        }
        if (userId) {
            this.global.userId = userId;
        }
        if (userId) {
            let user: any = this.global.getStorage('user');
            if (user) {
                this.global.user = user;
                if (this.global.user.role == 'student') {
                    return true;
                } else {
                    return this.router.createUrlTree(['/teacher']);
                }
            } else {
                return true;
            }
        }
        return true;
    }
}
