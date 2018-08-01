import { Action } from '@ngrx/store';

import { UserModel } from '../../core/user.model';
import { LOAD_USERS, UserAction, USERS_BUSY, USERS_ERROR, REQUEST_LOAD_USERS, USER_DELETE_SUCCESS } from './users.actions';

export interface UsersReducerState {
  users(state: UsersFeatureState, action: UserAction): UsersFeatureState;
}

export interface UsersState {
  users: UsersFeatureState;
}

export interface UsersFeatureState {
  usersList: UserModel[];
  usersBusy: boolean;
  usersErrorMessage: string;
}

export const initialUsersFeatureState: UsersFeatureState = {
  usersList: [],
  usersBusy: false,
  usersErrorMessage: ''
};

export const usersReducer = (state: UsersFeatureState = initialUsersFeatureState, action: UserAction): UsersFeatureState => {
  switch (action.type) {
    case REQUEST_LOAD_USERS:
      return {
        ...state,
        usersBusy: true
      };
    case LOAD_USERS:
      return {
        ...state,
        usersList: action.payload,
        usersBusy: false
      };
    case USERS_BUSY:
      return {
        ...state,
        usersBusy: action.payload
      };
    case USERS_ERROR:
      return {
        ...state,
        usersErrorMessage: action.payload
      };
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        usersList: [...state.usersList.filter(item => item._id !== action.payload._id)]
      };
    default:
      return state;
  }
};

export const usersFeatureReducer: UsersReducerState = {
  users: usersReducer
};
