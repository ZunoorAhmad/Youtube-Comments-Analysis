import { Component, OnInit } from '@angular/core';
import { GlobalService } from './services/global.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'VidvanFrontendV1';
    loadAction: boolean;

    constructor(public globalService: GlobalService) {}

    async ngOnInit(): Promise<void> {
        const token = this.globalService.getStorage('token');
        if (token) {
            this.globalService.token = token;
        }
        const user: any = await this.globalService.getStorage('user');
        if (user) {
            this.globalService.user = user;
        }
        const role: any = this.globalService.getStorage('role');
        if (role) {
            this.globalService.role = role;
        }
        this.globalService.getObservable('isLoading').subscribe(res => {
            this.loadAction = res;
        });
    }
}
