import { Component, OnInit } from '@angular/core';
import { GlobalService } from './services/global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'VidvanFrontendV1';
    loadAction: boolean;

    private apiKey = 'AIzaSyDe9syTXuWq9V8qArmTA0mhd9f1OTDAhnY'; // Replace with your actual API key
    private apiUrl = 'https://www.googleapis.com/youtube/v3/commentThreads';


    comments: any[] = [];
    videoId: string = ''; // Replace with actual YouTube video ID
    videoUrl: string = 'https://www.youtube.com/watch?v=KFfbdmNMOv8&list=PLdiReIuYxRFMuBbna2vrmVIO5t3YBgMw0'; // Replace with actual YouTube video ID


    getVideoComments(maxResults: number = 10): Observable<any> {
        const url = `${this.apiUrl}?part=snippet&videoId=${this.videoId}&key=${this.apiKey}&maxResults=${maxResults}`;
        console.log(url);
        return this.http.get(url);
    }

    getVideoId() {
        this.videoId = this.extractVideoId(this.videoUrl);
        if (this.videoId) {
            console.log('Extracted Video ID:', this.videoId);
            this.fetchComments();
        } else {
            console.error('Invalid YouTube URL');
        }
    }

    fetchComments() {
        if (!this.videoId) {
            console.error('No video ID found!');
            return;
        }

        this.getVideoComments().subscribe(
            (response) => {
                console.log('API Response:', response);
                this.comments = response.items.map((item: any) => item.snippet.topLevelComment.snippet);
            },
            (error) => {
                console.error('Error fetching comments:', error);
            }
        );
    }

    extractVideoId(url: string): string | null {
        const regex =
            /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    constructor(public globalService: GlobalService, private http: HttpClient) {
        this.getVideoId();
    }

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
