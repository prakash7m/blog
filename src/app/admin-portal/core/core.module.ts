import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationGuard } from './authentication.guard';
import { GlobalErrorHandler } from './global-error-handler';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [],
  providers: [AuthenticationService, AuthenticationGuard, GlobalErrorHandler]
})
export class CoreModule { }
