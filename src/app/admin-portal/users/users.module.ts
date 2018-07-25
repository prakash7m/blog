import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { CoreModule } from '../core/core.module';
import { UsersService } from './users.service';
import { RouterModule } from '../../../../node_modules/@angular/router';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    CoreModule,
    RouterModule
  ],
  providers: [UsersService],
  exports: [UserListComponent],
  declarations: [UserListComponent]
})
export class UsersModule { }
