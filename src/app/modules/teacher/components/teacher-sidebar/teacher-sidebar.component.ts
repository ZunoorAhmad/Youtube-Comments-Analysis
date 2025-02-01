import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
    selector: 'app-teacher-sidebar',
    templateUrl: './teacher-sidebar.component.html',
    styleUrls: ['./teacher-sidebar.component.scss'],
})
export class TeacherSidebarComponent {

    constructor(
        public globalService: GlobalService,
        private router: Router,
    ) { }

    isActive(route: string): boolean {
        return this.router.url.startsWith(route);
    }

}
