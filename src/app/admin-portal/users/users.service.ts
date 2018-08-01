import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RowsResponse, HandledErrorResponse, DataResponse } from '../core/response.model';
import { apiURL } from '../config';
import { UserModel } from '../core/user.model';
import { GlobalErrorHandler } from '../core/global-error-handler';


/**
 * Users service for api operation
 *
 * @export
 * @class UsersService
 */
@Injectable()
export class UsersService {
  constructor(private http: HttpClient, private globalErrorHandler: GlobalErrorHandler) { }
  /**
   * Get the list of users
   *
   * @returns {(Observable<RowsResponse<UserModel> | HandledErrorResponse>)}
   * @memberof UsersService
   */
  getUsers(): Observable<RowsResponse<UserModel> | HandledErrorResponse> {
    return this.http.get<RowsResponse<UserModel>>(`${apiURL}/user`, { withCredentials: true })
      .map((res: RowsResponse<UserModel>) => res)
      .catch((err: any, caught: Observable<RowsResponse<UserModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }

  /**
   * Add User
   *
   * @param {string} username
   * @param {string} email
   * @param {string} password
   * @returns {(Promise<DataResponse<UserModel> | HandledErrorResponse>)}
   * @memberof UsersService
   */
  async addUser(username: string, email: string, password: string): Promise<DataResponse<UserModel> | HandledErrorResponse> {
    return this.http.post<DataResponse<UserModel>>(`${apiURL}/user`, { username, email, password }, { withCredentials: true })
      .map((res: DataResponse<UserModel>) => res)
      .catch((err: any, caught: Observable<DataResponse<UserModel>>) => {
        return this.globalErrorHandler.handleError(err);
      })
      .toPromise();
  }

  /**
   * Delete user by id
   *
   * @param {string} id
   * @returns {(Observable<DataResponse<UserModel> | HandledErrorResponse>)}
   * @memberof UsersService
   */
  removeUser(id: string): Observable<DataResponse<UserModel> | HandledErrorResponse> {
    return this.http.delete<DataResponse<UserModel>>(`${apiURL}/user/${id}`, { withCredentials: true })
      .map((res: DataResponse<UserModel>) => res)
      .catch((err: any, caught: Observable<DataResponse<UserModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }
}
