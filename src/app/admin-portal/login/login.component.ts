import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../core/authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { GlobalErrorHandler } from '../core/global-error-handler';
import { Router } from '@angular/router';

@Component({
  selector: 'b-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  formGroup: FormGroup;
  info: {};
  isProgress: boolean;
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private globalErrorHandler: GlobalErrorHandler,
    private router: Router
  ) {
    this.formGroup = fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  async onSubmit(): Promise<any> {
    this.info = {};
    this.errorMessage = '';
    this.isProgress = true;
    let response;
    try {
      response = await this.authenticationService.authenticate({
        username: this.formGroup.get('username').value,
        password: this.formGroup.get('password').value
      });
      if (response.data) {
        this.router.navigate(['/admin']);
      } else {
        this.errorMessage = response.message;
      }
      
    } catch (e) {
      response = this.globalErrorHandler.handleError(e);
      this.errorMessage = response.message;
    }
    this.info = response;
    this.isProgress = false;
  }

  async ngOnInit() {
    // try {
    //   const authenticated = await this.authenticationService.isAuthenticated();
    //   if (authenticated) {
    //     this.router.navigateByUrl('/admin');
    //   }
    // } catch (err) {

    // }
  }

}
