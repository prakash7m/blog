import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { CustomValidator } from './custom.validator';
import { UsersService } from '../users.service';
import { DataResponse } from '../../core/response.model';
import { UserModel } from '../../core/user.model';
import { RequestCreateUser } from '../store/users.actions';
import { Observable } from '../../../../../node_modules/rxjs';
import { UsersState } from '../store/users.reducer';


@Component({
  selector: 'b-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  formGroup: FormGroup;
  errorResponse$ = this.store.select('usersFeature').map((state: UsersState) => state.users.usersError);
  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router, private store: Store<any>) {
    const passwordControl: FormControl = new FormControl(null, [Validators.required, Validators.minLength(5)]);
    this.formGroup = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      username: [null, [Validators.required, Validators.minLength(5)]],
      password: passwordControl,
      confirmPassword: [null, [Validators.required, CustomValidator.match(passwordControl)]]
    });
  }

  ngOnInit() {
  }

  addUser() {
    if (!this.formGroup.valid) {
      this.validateAllFormFields(this.formGroup);
      return false;
    }
    const user = {
      username: this.formGroup.get('username').value,
      email: this.formGroup.get('email').value,
      password: this.formGroup.get('password').value
    };
    this.store.dispatch(new RequestCreateUser(user));
  }
  validateAllFormFields(formGroup: FormGroup) {         // {1}
    Object.keys(formGroup.controls).forEach(field => {  // {2}
      const control = formGroup.get(field);             // {3}
      if (control instanceof FormControl) {             // {4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        // {5}
        this.validateAllFormFields(control);            // {6}
      }
    });
  }

  isFieldInvalid(field: string) {
    return !this.formGroup.get(field).valid && this.formGroup.get(field).touched;
  }
}
