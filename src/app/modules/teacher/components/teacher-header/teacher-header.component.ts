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
export class TeacherHeaderComponent {

}
