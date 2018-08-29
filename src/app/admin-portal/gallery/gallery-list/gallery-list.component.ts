import { Component, OnInit } from '@angular/core';
import { StateHelper } from '../../core/state.helper';
import { Observable } from 'rxjs/Observable';
import { HandledErrorResponse } from '../../core/response.model';
import { Store } from '@ngrx/store';
import { DataGridClass } from '../../core/data-grid/data-grid.class';
import { GalleryService } from '../gallery.service';
import { RequestLoadGallery, RequestDeleteGallery } from '../store/gallery.actions';

@Component({
  selector: 'b-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.scss']
})
export class GalleryListComponent extends DataGridClass<any> implements OnInit {
  featureState$ = StateHelper.stateForFeature(this.store, 'galleryFeature', 'gallery');
  busy$: Observable<boolean> = StateHelper.progressFor(this.featureState$, []);
  errorResponse$: Observable<HandledErrorResponse> = StateHelper.errorFor(this.featureState$, []);
  busyMessages: {[key: string]: string} = {
    ['test']: 'Loading gallery',
    ['t']: 'Deleting image'
  };
  afuConfig = {
    formatsAllowed: '.jpg,.png',
    uploadAPI: {
      url: 'https://example-file-upload-api'
    }
  };
  constructor(private usersService: GalleryService, private store: Store<any>) {
    super();
    this.featureState$.subscribe((gallery) => {
      this.rows = gallery.galleryList;
    });
  }

  ngOnInit() {
    if (!this.rows.length) {
      this.loadGallery();
    }
  }

  loadGallery() {
    this.store.dispatch(new RequestLoadGallery());
  }

  deleteImage(id) {
    this.store.dispatch(new RequestDeleteGallery(id));
  }

}
