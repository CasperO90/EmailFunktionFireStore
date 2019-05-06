import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {

  endpoint = 'https://us-central1-firestarter-96e46.cloudfunctions.net/httpEmail';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  sendEmail() {
    const data = {
      toEmail: 'caser90.n.olsen@gmail.com',
      toName: 'NameName'
    }
    this.http.post(this.endpoint, data).subscribe();
  }

}
