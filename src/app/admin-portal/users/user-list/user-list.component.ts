import { Component, OnInit } from '@angular/core';
import { Column } from '../../core/data-grid/data-grid.model';
import { UsersService } from '../users.service';
import { HandledErrorResponse, RowsResponse } from '../../core/response.model';
import { UserModel } from '../../core/user.model';
import { DataGridClass } from '../../core/data-grid/data-grid.class';

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
    handler: function (row, event) {
      console.log(row);
    }
  }];
  constructor(private usersService: UsersService) { super(); }

  async ngOnInit() {
    try {
      const response = <RowsResponse<UserModel>>await this.usersService.getUsers();
      if (response.rows) {
        this.rows = response.rows;
      }
    } catch (err) {
      this.rows = [];
      this.errorMessage = err.message;
    }
  }

}
