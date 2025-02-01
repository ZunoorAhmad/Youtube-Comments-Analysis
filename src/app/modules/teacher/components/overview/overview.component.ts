import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  userUrl: string;
  videoData: any = {};
  loading: boolean = false;
  loadingMessage: string = '';

  constructor(
    private http: HttpService,
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.userUrl = history.state.userUrl;
    console.log('User URL:', this.userUrl);
    if (this.userUrl) {
      this.fetchResults();
    }
  }

  fetchResults(): void {
    // Start the loading process
    this.loading = true;
    this.loadingMessage = "Loading...";

    // After 1 second, if still loading, update the message.
    setTimeout(() => {
      if (this.loading) {  // still loading
        this.loadingMessage = "Analyzing Comments...";
      }
    }, 2000);

    const endpoint = environment.baseUrl + 'youtube-sentiment/';
    const queryParams = `?url=${encodeURIComponent(this.userUrl)}&user_id=${this.globalService.user.id}`;

    this.http.get(endpoint + queryParams)
      .then((res) => {
        console.log(res);
        this.videoData = res;
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  }
}
