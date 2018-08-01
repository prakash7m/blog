import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/mergeMap';
import { REQUEST_LOAD_USERS, LoadUsers, UsersError, UserAction, REQUEST_DELETE_USER, UserDeleteSuccess } from './users.actions';
import { UsersService } from '../users.service';
import { RowsResponse, DataResponse } from '../../core/response.model';
import { UserModel } from '../../core/user.model';
import { UsersFeatureState } from './users.reducer';



/**
 * The users effect class to do some asynchronous actions. Loading of users, deleting users, creating users and updating.
 *
 * @export
 * @class UsersEffect
 */
@Injectable()
export class UsersEffect {
  constructor(private actions$: Actions, private usersService: UsersService, private store: Store<UsersFeatureState>) { }
  @Effect()
  $requestLoadUsersEffect = this.actions$
    .ofType(REQUEST_LOAD_USERS)
    .map((action: UserAction) => action.payload)
    .mergeMap(() => {
        return this.usersService.getUsers()
          .map((response: RowsResponse<UserModel>) => {
            if (response.rows) {
              return new LoadUsers(response.rows);
            } else {
              return new UsersError(response.message);
            }
          });
    });

  @Effect()
  $requestDeleteUserEffect = this.actions$
    .ofType(REQUEST_DELETE_USER)
    .map((action: UserAction) => action.payload)
    .mergeMap((id: string) => {
      return this.usersService.removeUser(id)
        .map((response: DataResponse<UserModel>) => {
          if (response.data) {
            return new UserDeleteSuccess(response.data);
          } else {
            return new UsersError(response.message);
          }
        });
    });
}
