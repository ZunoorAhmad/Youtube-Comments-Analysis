import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
    selector: 'app-teacher-dashboard',
    templateUrl: './teacher-dashboard.component.html',
    styleUrl: './teacher-dashboard.component.scss',
})
export class TeacherDashboardComponent implements OnInit {
    urlControl: FormControl;

    constructor(
        public globalService: GlobalService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.urlControl = new FormControl('', [
            Validators.required,
            Validators.pattern(/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/)
        ]);
    }

    analyzeUrl(): void {
        if (this.urlControl.valid) {
            console.log('Valid YouTube URL:', this.urlControl.value);
            const userUrl = this.urlControl.value;
            this.router.navigate(['/teacher/overview'], { state: { userUrl } });
        } else {
            this.urlControl.markAsTouched();
        }
    }
}