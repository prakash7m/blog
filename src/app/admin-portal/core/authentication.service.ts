import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { UserModel } from './user.model';
import { DataResponse } from './response.model';
import { apiURL } from '../config';



@Injectable()
export class AuthenticationService {
  private user: UserModel;
  constructor(private http: HttpClient, private router: Router) { }

  isAuthenticated(): Promise<boolean> {
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

  authenticate({ username, password }): Promise<Object> {
    return this.http.post(`${apiURL}/login`, { username, password }, { withCredentials: true })
      .map((res: DataResponse<UserModel>) => {
        return this.user = res.data;
      })
      .toPromise();
  }

  logout() {
    return this.http.get(`${apiURL}/logout`, { withCredentials: true })
      .do((res: DataResponse<any>) => {
        this.user = null;
      })
      .toPromise();
  }
}
