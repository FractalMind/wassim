import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})

export class LoginPage {

  public loginForm: FormGroup;

  constructor(
    private formControl: FormControl,
    private formGroup: FormGroup,
  ) {
      this.loginForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
      });
  }
}
