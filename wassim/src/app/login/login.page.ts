import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {validateCredentials, validatePassword} from "../../validators/password.validator";


@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})

export class LoginPage {

  public loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      validatePassword,
      validateCredentials,
    ]),
  });

  submitLogin() {
    console.log(this.loginForm, '$event')
  }

}
