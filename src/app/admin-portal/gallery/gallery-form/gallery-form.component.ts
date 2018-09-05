import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { HttpEvent, HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { apiURL } from '../../config';

@Component({
  selector: 'b-gallery-form',
  templateUrl: './gallery-form.component.html',
  styleUrls: ['./gallery-form.component.scss']
})
export class GalleryFormComponent implements OnInit {
  accept = '*';
  files: File[] = [];
  progress: number;
  url = `${apiURL}/gallery`;
  hasBaseDropZoneOver = false;
  httpEmitter: Subscription;
  httpEvent: HttpEvent<{}>;
  lastFileAt: Date;
  maxSize: 2048;

  sendableFormData: FormData;

  constructor(public httpClient: HttpClient) { }

  ngOnInit() {
  }

  cancel() {
    this.progress = 0;
    if (this.httpEmitter) {
      console.log('cancelled');
      this.httpEmitter.unsubscribe();
    }
  }

  uploadFiles(files: File[]): Subscription {
    const req = new HttpRequest<FormData>('POST', this.url, this.sendableFormData, {
      withCredentials: true,
      reportProgress: true // ,responseType: 'text'
    });

    return this.httpEmitter = this.httpClient.request(req)
      .subscribe(
        event => {
          this.httpEvent = event;

          if (event instanceof HttpResponse) {
            delete this.httpEmitter;
            console.log('request done', event);
          }
        },
        error => console.log('Error Uploading', error)
      );
  }

  getDate() {
    return new Date();
  }

}
