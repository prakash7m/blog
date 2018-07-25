import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RowsResponse, HandledErrorResponse } from '../core/response.model';
import { apiURL } from '../config';
import { UserModel } from '../core/user.model';
import { GlobalErrorHandler } from '../core/global-error-handler';


@Injectable()
export class UsersService {
  constructor(private http: HttpClient, private globalErrorHandler: GlobalErrorHandler) { }
  async getUsers(): Promise<RowsResponse<UserModel> | HandledErrorResponse> {
    return this.http.get<RowsResponse<UserModel>>(`${apiURL}/user`, { withCredentials: true })
      .map((res: RowsResponse<UserModel>) => res)
      .catch((err: any, caught: Observable<RowsResponse<UserModel>>) => {
        return this.globalErrorHandler.handleError(err);
      })
      .toPromise();
  }
}
