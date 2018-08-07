import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomValidator } from './custom.validator';
import { UsersService } from '../users.service';
import { DataResponse } from '../../core/response.model';
import { UserModel } from '../../core/user.model';

@Component({
  selector: 'b-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  formGroup: FormGroup;
  errorMsg: string;
  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router) {
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

  async addUser() {
    if (!this.formGroup.valid) {
      this.validateAllFormFields(this.formGroup);
      return false;
    }
    try {
      const res: DataResponse<UserModel> = <DataResponse<UserModel>>await this.userService.addUser(
        this.formGroup.get('username').value,
        this.formGroup.get('email').value,
        this.formGroup.get('password').value
      );
      console.log(res);
      if (res.data) {
        this.router.navigateByUrl('/admin/users');
      }
    } catch (err) {
      console.log(err);
      this.errorMsg = err.message;
    }
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
