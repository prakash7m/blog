import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Column } from '../../core/data-grid/data-grid.model';
import { UsersService } from '../users.service';
import { DataResponse } from '../../core/response.model';
import { UserModel } from '../../core/user.model';
import { DataGridClass } from '../../core/data-grid/data-grid.class';
import { UsersFeatureState, UsersState } from '../store/users.reducer';
import { RequestLoadUsers, RequestDeleteUser } from '../store/users.actions';

@Component({
  selector: 'b-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends DataGridClass<UserModel> implements OnInit {
  columns: Column[] = [{
    dataIndex: 'username',
    text: 'Username',
    link: '/admin/user/edit'
  }, {
    dataIndex: 'fullname',
    text: 'Full Name'
  }, {
    dataIndex: 'email',
    text: 'Email'
  }];
  emptyText = 'Users not found';
  actions = [{
    text: 'Delete',
    handler: (row) => {
      this.deleteUser(row._id);
    }
  }];

  constructor(private usersService: UsersService, private store: Store<UsersFeatureState>) {
    super();
    this.store.select('usersFeature').subscribe((state: UsersState) => {
      this.rows = state.users.usersList;
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.store.dispatch(new RequestLoadUsers());
  }

  deleteUser(id) {
    this.store.dispatch(new RequestDeleteUser(id));
  }
}
