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

  // Define an array of messages that will be cycled every second.
  private loadingMessages: string[] = [
    "Loading...",
    "Analyzing Comments...",
    "Crunching Data...",
    "Almost Done..."
  ];
  private currentMessageIndex: number = 0;
  private loadingInterval: any; // used to store the interval ID

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
    this.loading = true;
    this.currentMessageIndex = 0;
    // Set the first message
    this.loadingMessage = this.loadingMessages[this.currentMessageIndex];

    // Start an interval to update the message every 1 second.
    this.loadingInterval = setInterval(() => {
      this.currentMessageIndex = (this.currentMessageIndex + 1) % this.loadingMessages.length;
      this.loadingMessage = this.loadingMessages[this.currentMessageIndex];
    }, 1000);

    // Construct the API URL.
    const endpoint = environment.baseUrl + 'youtube-sentiment/';
    const queryParams = `?url=${encodeURIComponent(this.userUrl)}&user_id=${this.globalService.user.id}`;
    this.http.get(endpoint + queryParams)
      .then((res) => {
        console.log(res);
        this.videoData = res;
        this.loading = false;
        clearInterval(this.loadingInterval);
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
        clearInterval(this.loadingInterval);
      });
  }
}
