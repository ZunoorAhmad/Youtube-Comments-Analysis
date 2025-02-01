import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit {

  histories: any[] = [];

  constructor(private http: HttpService,
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.http.get(environment.baseUrl + 'user-history/' + this.globalService.user.id).then((res: any) => {
      console.log(res);
      this.histories = res.history;
    })
  }

  download(videoData) {
    console.log(videoData);
    const url = environment.baseUrl + 'download-history/' + this.globalService.user.id + "/" + videoData.id;
    // this.http.get(environment.baseUrl + 'download-history/' + this.globalService.user.id + "/" + videoData.id).then((res: any) => {
    //   console.log(res);
    //   this.histories = res.history;
    // })
    window.open(url, '_blank');
  }

}
