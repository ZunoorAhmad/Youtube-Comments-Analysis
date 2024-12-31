import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
    selector: 'app-teacher-dashboard',
    templateUrl: './teacher-dashboard.component.html',
    styleUrl: './teacher-dashboard.component.scss',
})
export class TeacherDashboardComponent implements OnInit {
    classesInfo: any = {};
    allPendingStudents: any[] = [];
    notifications: any[] = [];

    constructor(
        public globalService: GlobalService
    ) { }

    ngOnInit(): void {

    }
}
