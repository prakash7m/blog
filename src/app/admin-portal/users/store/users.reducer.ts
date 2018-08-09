import { Action } from '@ngrx/store';

import { UserModel } from '../../core/user.model';
import { LOAD_USERS, UserAction, USERS_BUSY, USERS_ERROR, REQUEST_LOAD_USERS,
  USER_DELETE_SUCCESS, REQUEST_DELETE_USER, REQUEST_CREATE_USER,
  USER_CREATE_SUCCESS, USER_LOAD_SUCCESS, REQUEST_LOAD_USER, RESET_EDITING_USER,
  USER_EDIT_SUCCESS, REQUEST_EDIT_USER } from './users.actions';
import { HandledErrorResponse } from '../../core/response.model';

export interface UsersReducerState {
  users(state: UsersFeatureState, action: UserAction): UsersFeatureState;
}

export interface UsersState {
  users: UsersFeatureState;
}

export interface UsersFeatureState {
  usersList: UserModel[];
  editingUser: UserModel;
  usersBusy: boolean;
  usersError: HandledErrorResponse;
}

export const initialUsersFeatureState: UsersFeatureState = {
  usersList: [],
  editingUser: null,
  usersBusy: false,
  usersError: null
};

export const usersReducer = (state: UsersFeatureState = initialUsersFeatureState, action: UserAction): UsersFeatureState => {
  switch (action.type) {
    case REQUEST_LOAD_USERS:
    case REQUEST_DELETE_USER:
    case REQUEST_CREATE_USER:
    case REQUEST_LOAD_USER:
    case REQUEST_EDIT_USER:
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
    case USER_LOAD_SUCCESS:
      return {
        ...state,
        editingUser: action.payload,
        usersBusy: false
      };
    case USER_EDIT_SUCCESS:
      return {
        ...state,
        usersList: [...state.usersList.map(item => item._id === action.payload._id ? action.payload : item)],
        editingUser: null,
        usersBusy: false
      };
    case RESET_EDITING_USER:
      return {
        ...state,
        editingUser: null
      };
    default:
      return state;
  }
};

export const usersFeatureReducer: UsersReducerState = {
  users: usersReducer
};
