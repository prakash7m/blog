import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatDialog, MatDialogContent, MatDialogActions} from '@angular/material';

import { WINDOW_PROVIDERS } from './window.service';
import { OkCancelDialogComponent } from './ok-cancel-dialog/ok-cancel-dialog.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OkCancelDialogComponent],
  exports: [OkCancelDialogComponent],
  providers: [ WINDOW_PROVIDERS ]
})
export class SharedModule { }
