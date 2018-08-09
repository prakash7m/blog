import { UserModel } from '../../core/user.model';
import { UserCreateModel } from '../users.model';
import { HandledErrorResponse } from '../../core/response.model';

export const LOAD_USERS = '[users] LOAD';
export const REQUEST_LOAD_USERS = '[users] REQUEST LOAD';
export const USERS_BUSY = '[users] USERS BUSY';
export const USERS_ERROR = '[users] USERS ERROR';
export const REQUEST_DELETE_USER = '[users] REQUEST DELETE';
export const USER_DELETE_SUCCESS = '[users] DELETE SUCCESS';
export const REQUEST_CREATE_USER = '[users] REQUEST CREATE';
export const USER_CREATE_SUCCESS = '[users] CREATE SUCCESS';
export const REQUEST_LOAD_USER = '[users] REQUEST LOAD USER';
export const USER_LOAD_SUCCESS = '[users] LOAD USER SUCCESS';
export const RESET_EDITING_USER = '[users] RESET EDITING USER';
export const REQUEST_EDIT_USER = '[users] REQUEST EDIT USER';
export const USER_EDIT_SUCCESS = '[users] EDIT USER SUCCESS';

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
  constructor(public payload: HandledErrorResponse) { }
}

export class RequestDeleteUser implements UserAction {
  readonly type: string =  REQUEST_DELETE_USER;
  constructor(public payload: string) { }
}

export class UserDeleteSuccess implements UserAction {
  readonly type: string =  USER_DELETE_SUCCESS;
  constructor(public payload: UserModel) { }
}

export class RequestCreateUser implements UserAction {
  readonly type: string =  REQUEST_CREATE_USER;
  constructor(public payload: UserCreateModel) { }
}

export class UserCreateSuccess implements UserAction {
  readonly type: string =  USER_CREATE_SUCCESS;
  constructor(public payload: UserModel) { }
}

export class RequestLoadUser implements UserAction {
  readonly type: string =  REQUEST_LOAD_USER;
  constructor(public payload: string) { }
}

export class UserLoadSuccess implements UserAction {
  readonly type: string =  USER_LOAD_SUCCESS;
  constructor(public payload: UserModel) { }
}

export class ResetEditingUser implements UserAction {
  readonly type: string =  RESET_EDITING_USER;
  constructor() { }
}

export class RequestEditUser implements UserAction {
  readonly type: string =  REQUEST_EDIT_USER;
  constructor(public payload: UserModel) { }
}

export class UserEditSuccess implements UserAction {
  readonly type: string =  USER_EDIT_SUCCESS;
  constructor(public payload: UserModel) { }
}

