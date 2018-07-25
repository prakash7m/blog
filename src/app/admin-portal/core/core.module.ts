import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationGuard } from './authentication.guard';
import { GlobalErrorHandler } from './global-error-handler';
import { DataGridComponent } from './data-grid/data-grid.component';
import { RouterModule } from '../../../../node_modules/@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [DataGridComponent],
  exports: [DataGridComponent],
  providers: [AuthenticationService, AuthenticationGuard, GlobalErrorHandler]
})
export class CoreModule { }
