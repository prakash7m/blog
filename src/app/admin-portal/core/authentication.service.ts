import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/util/pipe';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserModel } from './user.model';
import { DataResponse, HandledErrorResponse, StandardResponse } from './response.model';
import { apiURL } from '../config';
import { GlobalErrorHandler } from './global-error-handler';

/**
 * Service to do user authentication related calls.
 *
 * @export
 * @class AuthenticationService
 */
@Injectable()
export class AuthenticationService {
  private user: UserModel = null;
  private recentAuthStatus: boolean = null;
  /**
   * Creates an instance of AuthenticationService.
   * @param {HttpClient} http
   * @param {Router} router
   * @param {GlobalErrorHandler} globalErrorHandler
   * @memberof AuthenticationService
   */
  constructor(private http: HttpClient, private router: Router, private globalErrorHandler: GlobalErrorHandler) { }

  /**
   * Makes api call to server to check the logged in state of the user.
   * If logged in, saves in a local variable for future reference.
   *
   * @returns {Promise<boolean>}
   * @memberof AuthenticationService
   */
  async isAuthenticated(): Promise<boolean | HandledErrorResponse> {
    if (this.recentAuthStatus !== null) {
      return Observable.of(this.recentAuthStatus).toPromise();
    }
    return this.http.get<DataResponse<UserModel>>(`${apiURL}/isauthenticated`, { withCredentials: true })
      .map((res: DataResponse<UserModel>) => {
        this.user = res.data;
        this.recentAuthStatus = true;
        return true;
      })
      .catch((err: any, caught: Observable<boolean>) => {
        this.recentAuthStatus = false;
        return this.globalErrorHandler.handleError(err);
      })
      .toPromise();
  }

  /**
   * Authenticate a user with provided credentials
   *
   * @param {*} { username, password }
   * @returns {Promise<Object>}
   * @memberof AuthenticationService
   */
  async authenticate({ username, password }): Promise<DataResponse<UserModel> | HandledErrorResponse> {
    return this.http.post<DataResponse<UserModel>>(`${apiURL}/login`, { username, password }, { withCredentials: true })
      .map((res: DataResponse<UserModel>) => {
        this.user = res.data;
        this.recentAuthStatus = true;
        return res;
      })
      .catch((err: any, caught: Observable<DataResponse<UserModel>>) => {
        this.recentAuthStatus = false;
        return this.globalErrorHandler.handleError(err);
      })
      .toPromise();
  }

  /**
   * Logs out a user. Also resets the local logged in status.
   *
   * @returns {Promise<any>}
   * @memberof AuthenticationService
   */
  async logout(): Promise<StandardResponse | HandledErrorResponse> {
    return this.http.get(`${apiURL}/logout`, { withCredentials: true })
      .map((res: StandardResponse) => {
        this.user = null;
        this.recentAuthStatus = false;
        return res;
      })
      .catch((err: any, caught: Observable<StandardResponse>) => {
        this.recentAuthStatus = false;
        return this.globalErrorHandler.handleError(err);
      })
      .toPromise();
  }
}
