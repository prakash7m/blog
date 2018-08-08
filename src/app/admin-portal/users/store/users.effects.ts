import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import 'rxjs/add/operator/mergeMap';
import { REQUEST_LOAD_USERS, LoadUsers, UsersError, UserAction,
  REQUEST_DELETE_USER, UserDeleteSuccess, REQUEST_CREATE_USER, UserCreateSuccess } from './users.actions';
import { UsersService } from '../users.service';
import { RowsResponse, DataResponse } from '../../core/response.model';
import { UserModel } from '../../core/user.model';
import { UsersFeatureState } from './users.reducer';
import { UserCreateModel } from '../users.model';
import { Observable, ObservableInput } from '../../../../../node_modules/rxjs';


/**
 * The users effect class to do some asynchronous actions. Loading of users, deleting users, creating users and updating.
 *
 * @export
 * @class UsersEffect
 */
@Injectable()
export class UsersEffect {
  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private store: Store<UsersFeatureState>,
    private router: Router
  ) { }
  @Effect()
  $requestLoadUsersEffect = this.actions$
    .ofType(REQUEST_LOAD_USERS)
    .map((action: UserAction) => action.payload)
    .mergeMap(() => {
        return this.usersService.getUsers()
          .map((response: RowsResponse<UserModel>) => {
            if (response.rows) {
              return new LoadUsers(response.rows);
            }
          })
          .catch((err: any, caught: Observable<UsersError | LoadUsers>) => {
            this.store.dispatch(new UsersError(err.message));
            return Observable.of();
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
          }
        })
        .catch((err: any, caught: Observable<UsersError | UserDeleteSuccess>) => {
          this.store.dispatch(new UsersError(err));
          return Observable.of();
        });
    });

  @Effect()
  $requestCreateUserEffect = this.actions$
    .ofType(REQUEST_CREATE_USER)
    .map((action: UserAction) => action.payload)
    .mergeMap((user: UserCreateModel) => {
      return this.usersService.addUser(user)
        .map((response: DataResponse<UserModel>) => {
          if (response.data) {
            this.router.navigate(['/admin/users']);
            return new UserCreateSuccess(response.data);
          }
        })
        .catch((err: any, caught: Observable<UsersError | UserCreateSuccess>) => {
          this.store.dispatch(new UsersError(err));
          return Observable.of();
        });
    });
}
