import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'b-gallery-form',
  templateUrl: './gallery-form.component.html',
  styleUrls: ['./gallery-form.component.scss']
})
export class GalleryFormComponent implements OnInit {
  afuConfig = {
    uploadAPI: {
      url: 'https://example-file-upload-api'
    }
  };
  constructor() { }

  ngOnInit() {
  }

}
