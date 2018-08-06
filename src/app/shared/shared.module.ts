import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WINDOW_PROVIDERS } from './window.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ WINDOW_PROVIDERS ]
})
export class SharedModule { }
