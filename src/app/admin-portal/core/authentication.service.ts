import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { UserModel } from './user.model';
import { DataResponse } from './response.model';
import { apiURL } from '../config';
import { GlobalErrorHandler } from './global-error-handler';



@Injectable()
export class AuthenticationService {
  private user: UserModel;
  constructor(private http: HttpClient, private router: Router, private errorHandler: GlobalErrorHandler) { }

  async isAuthenticated(): Promise<boolean> {
    if (this.user) {
      return Observable.of(true).toPromise();
    }
    return this.http.get(`${apiURL}/isauthenticated`, { withCredentials: true })
      .map((res: DataResponse<UserModel>) => {
        this.user = res.data;
        return res.data ? true : false;
      })
      .toPromise();
  }

  async authenticate({ username, password }): Promise<Object> {
    return this.http.post(`${apiURL}/login`, { username, password }, { withCredentials: true })
      .map((res: DataResponse<UserModel>) => {
        this.user = res.data;
        return res;
      })
      .catch((err: any, caught: Observable<Object>): Promise<Object> => {
        console.log(err)
        return Observable.of(err.error).toPromise();
      })
      .toPromise();
  }

  async logout(): Promise<any> {
    return this.http.get(`${apiURL}/logout`, { withCredentials: true })
      .do((res: DataResponse<any>) => {
        this.user = null;
      })
      .toPromise();
  }
}
