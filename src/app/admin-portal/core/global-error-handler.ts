import { Injector, ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    status: number;
    ok: boolean;
    statusText: string;
    headers: HttpHeaders;
    error: any;
    message: string;
    name: string;
    url: string;
    constructor(private injector: Injector) { }

    handleError(error: Error | HttpErrorResponse) {
        if (error instanceof HttpErrorResponse) {
            if (!navigator.onLine) {
                return this.handleOffline(error);
            } else {
                return this.handleStatus(error, error.status);
            }
        } else {
            return this.handleClient(error);
        }
    }

    handleOffline(error: HttpErrorResponse) {
        console.log(error);
    }

    handleStatus(error: HttpErrorResponse, status: number) {
        console.log('status', status, error);
        return {
            message: error.error && error.error.message || error.message,
            error: error
        };
    }

    handleClient(error: Error) {
        console.log('client: ', error);
    }
}
