import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
    selector: 'app-teacher-header',
    templateUrl: './teacher-header.component.html',
    styleUrl: './teacher-header.component.scss',
})
export class TeacherHeaderComponent {

    constructor(public globalService: GlobalService) { }

}
