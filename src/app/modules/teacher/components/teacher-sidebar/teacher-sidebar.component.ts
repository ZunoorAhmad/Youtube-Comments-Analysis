import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { GlobalService } from 'src/app/services/global.service';

@Component({
    selector: 'app-teacher-sidebar',
    templateUrl: './teacher-sidebar.component.html',
    styleUrls: ['./teacher-sidebar.component.scss'],
})
export class TeacherSidebarComponent implements OnInit {
    @Input() sidebarVisible = true;
    items: MenuItem[] | undefined;
    @Output() toClose = new EventEmitter();
    sidebarVisibleItems: boolean = false;

    constructor(
        public globalService: GlobalService,
        private router: Router,
    ) {
    }

    updateActiveState() {
        const currentUrl = this.router.url;
        this.items.forEach(item => {
            if (currentUrl.startsWith(item.routerLink)) {
                item.expanded = true;
            } else {
                item.expanded = false;
            }
        });
    }

    ngOnInit(): void {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.updateActiveState();
            }
        });
        const url = window.location.href;
        this.globalService.classId = url.split('/').pop();
        this.items = [
            {
                label: 'Dashboard',
                icon: 'custom-dashboard-icon custom-icon-class',
                routerLink: '/teacher/teacher-dashboard',
            },
            {
                label: 'ALL CLASSES',
                icon: 'custom-class-icon custom-icon-class',
                routerLink: '/teacher/classes',
                routerLinkActiveOptions: { exact: false },
            },
            {
                label: 'Teacher Profile',
                icon: 'custom-person-icon custom-icon-class',
                routerLink: '/teacher/profile',
            },
            {
                label: 'CALENDAR',
                icon: 'custom-calendar-icon custom-icon-class',
                routerLink: '/teacher/calendar',
            },
            {
                label: 'MESSAGES',
                icon: 'custom-message-icon custom-icon-class',
                routerLink: '/teacher/messages',
            },
            {
                label: 'REPORTS',
                icon: 'custom-reports-icon custom-icon-class',
                routerLink: '/teacher/reports',
            },
            {
                label: 'Logout',
                icon: 'custom-logout-white-icon custom-icon-class',
                command: () => {
                    this.globalService.logout();
                },
            },
        ];
        if (
            (this.router.url.includes('class') && !this.router.url.includes('classes')) ||
            this.router.url.includes('create-announcement')
        ) {
            this.globalService.setObservable('isClassSetup', true);
        }
    }

    calculateProfileCompleteness(user: any): number {
        const totalFields = 10;
        let completedFields = 0;
        if (user.firstName && user.firstName.trim() !== '') {
            completedFields++;
        }
        if (user.nickName && user.nickName.trim() !== '') {
            completedFields++;
        }
        if (user.image && user.image !== null) {
            completedFields++;
        }
        if (user.isOneToOne !== null) {
            completedFields++;
        }
        if (user.phoneNumber && user.phoneNumber.trim() !== '') {
            completedFields++;
        }
        if (user.summary && user.summary.trim() !== '') {
            completedFields++;
        }
        if (user.videoUrl && user.videoUrl.trim() !== '') {
            completedFields++;
        }
        if (user.isVerified !== null && user.isVerified === true) {
            completedFields++;
        }
        if (user.email !== null && user.email) {
            completedFields++;
        }
        if (user.createdAt !== null && user.createdAt != '') {
            completedFields++;
        }
        const completenessPercentage = (completedFields / totalFields) * 100;
        return Math.round(completenessPercentage);
    }

    setSidebarItems() {}

    onCloseSidebar() {
        this.sidebarVisible = !this.sidebarVisible;
        this.toClose.emit(this.sidebarVisible);
    }
}
