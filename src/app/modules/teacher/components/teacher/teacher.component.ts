import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
    selector: 'app-teacher',
    templateUrl: './teacher.component.html',
    styleUrls: ['./teacher.component.scss'],
})
export class TeacherComponent {
    sidebarVisible = true;

    arr = [
        '/teacher/class-setup/1',
        '/teacher/class-detail-setup',
        '/teacher/class-schedule/1',
        '/teacher/class-students',
    ];

    constructor(public globalService: GlobalService) {}

    onCloseSidebar(event) {
        this.sidebarVisible = event;
    }

    toggleSidebar() {
        this.sidebarVisible = !this.sidebarVisible;
    }
}
