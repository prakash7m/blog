import { Action } from '@ngrx/store';

import { UserModel } from '../../core/user.model';
import { LOAD_USERS, UserAction, USERS_BUSY, USERS_ERROR, REQUEST_LOAD_USERS,
  USER_DELETE_SUCCESS, REQUEST_DELETE_USER, REQUEST_CREATE_USER, USER_CREATE_SUCCESS } from './users.actions';
import { HandledErrorResponse } from '../../core/response.model';

export interface UsersReducerState {
  users(state: UsersFeatureState, action: UserAction): UsersFeatureState;
}

export interface UsersState {
  users: UsersFeatureState;
}

export interface UsersFeatureState {
  usersList: UserModel[];
  usersBusy: boolean;
  usersError: HandledErrorResponse;
}

export const initialUsersFeatureState: UsersFeatureState = {
  usersList: [],
  usersBusy: false,
  usersError: null
};

export const usersReducer = (state: UsersFeatureState = initialUsersFeatureState, action: UserAction): UsersFeatureState => {
  switch (action.type) {
    case REQUEST_LOAD_USERS:
    case REQUEST_DELETE_USER:
    case REQUEST_CREATE_USER:
      return {
        ...state,
        usersBusy: true,
        usersError: null
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
        usersError: action.payload,
        usersBusy: false
      };
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        usersList: [...state.usersList.filter(item => item._id !== action.payload._id)],
        usersBusy: false
      };
    case USER_CREATE_SUCCESS:
      return {
        ...state,
        usersList: [...state.usersList, action.payload],
        usersBusy: false
      };
    default:
      return state;
  }
};

export const usersFeatureReducer: UsersReducerState = {
  users: usersReducer
};
