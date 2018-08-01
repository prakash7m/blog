import { UserModel } from '../../core/user.model';

export const LOAD_USERS = '[users] LOAD';
export const REQUEST_LOAD_USERS = '[users] REQUEST LOAD';
export const USERS_BUSY = '[users] USERS BUSY';
export const USERS_ERROR = '[users] USERS ERROR';
export const REQUEST_DELETE_USER = '[users] REQUEST DELETE';
export const USER_DELETE_SUCCESS = '[users] DELETE SUCCESS';

export interface UserAction {
  type: string;
  payload?: any;
}

export class LoadUsers implements UserAction {
  readonly type: string = LOAD_USERS;
  constructor(public payload: UserModel[]) { }
}

export class RequestLoadUsers implements UserAction {
  readonly type: string = REQUEST_LOAD_USERS;
  constructor() { }
}

export class UsersBusy implements UserAction {
  readonly type: string =  USERS_BUSY;
  constructor(public payload: boolean) { }
}

export class UsersError implements UserAction {
  readonly type: string =  USERS_ERROR;
  constructor(public payload: string) { }
}

export class RequestDeleteUser implements UserAction {
  readonly type: string =  REQUEST_DELETE_USER;
  constructor(public payload: string) { }
}

export class UserDeleteSuccess implements UserAction {
  readonly type: string =  USER_DELETE_SUCCESS;
  constructor(public payload: UserModel) { }
}

