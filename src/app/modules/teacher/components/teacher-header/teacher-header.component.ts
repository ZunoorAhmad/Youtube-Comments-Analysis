import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/services/http.service';

@Component({
    selector: 'app-teacher-header',
    templateUrl: './teacher-header.component.html',
    styleUrl: './teacher-header.component.scss',
})
export class TeacherHeaderComponent implements OnInit, OnDestroy {
    active: number = 1;
    routerSubscription: Subscription;
    classesCount: number = 0;
    constructor(
        private router: Router,
        private globalService: GlobalService,
        private http: HttpService
    ) {
        this.startEvent();
    }

    ngOnInit(): void {
        this.startEvent();
        this.routerSubscription = this.router.events.subscribe(event => {
            this.http
                .get(environment.baseUrl + 'classes/count/' + this.globalService.user.id)
                .then((allClasses: any) => {
                    this.classesCount = allClasses.data.total_classes;
                });
            if (event instanceof NavigationEnd) {
                this.startEvent();
            }
        });
    }

    startEvent() {
        const url: string = this.router.url;
        if (url.includes('class-setup')) {
            this.active = 0;
        } else if (url.includes('class-students')) {
            this.active = 1;
        } else if (url.includes('class-detail-setup')) {
            this.active = 2;
        } else if (url.includes('class-schedule')) {
            this.active = 3;
        } else if (url.includes('add-price')) {
            this.active = 4;
        } else if (url.includes('class-review')) {
            this.active = 4;
        } else if (url.includes('teacher-intro')) {
            this.active = 5;
        } else if (url.includes('allow-one-on-one')) {
            this.active = 6;
        } else if (url.includes('teacher-image-info')) {
            this.active = 7;
        }
    }

    setupCondition(): boolean {
        if (this.router.url.includes('class-setup')) {
            if (this.classesCount == 0) {
                return true;
            } else {
                return false;
            }
        } else {
            if (this.classesCount <= 1) {
                return true;
            } else {
                return false;
            }
        }
    }

    stepperCondition(): boolean {
        if (this.router.url.includes('class-setup')) {
            if (this.classesCount >= 1) {
                return true;
            } else {
                return false;
            }
        } else {
            if (this.classesCount > 1) {
                return true;
            } else {
                return false;
            }
        }
    }

    openCancelConfirmationModal() {
        // this.globalService.openDialog(CancelConfirmationComponent, {}, '', '100%', 'cancelConfirmation-modal');
    }

    ngOnDestroy() {
        if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
        }
    }
}
