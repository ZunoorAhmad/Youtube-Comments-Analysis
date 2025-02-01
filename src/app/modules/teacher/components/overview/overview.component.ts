import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {
  userUrl: string;
  videoData: any = {};

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.userUrl = history.state.userUrl;
    console.log('User URL:', this.userUrl)
  }

  fetchResults(): void {
    this.http.get(environment.baseUrl + 'youtube-sentiment/?url=' + this.userUrl + '&user_id=').then((res) => {
      console.log(res);
      this.videoData = res;
    }).catch((err) => {
      console.log(err);
    })
  }
}
