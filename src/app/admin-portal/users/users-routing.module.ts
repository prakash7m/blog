import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersComponent } from './users.component';

const routes: Routes = [{
  path: '',
  component: UsersComponent,
  children: [{
    path: '',
    component: UserListComponent,
    data: { title: 'Users List' }
  }, {
    path: 'create',
    component: UserFormComponent,
    data: { title: 'User Create' }
  }]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
