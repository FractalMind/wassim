import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Observable, tap} from "rxjs";
import {TodoDto} from "../../dtos/todo.dto";
import {TodoService} from "../../services/todo.service";
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
    password: new FormControl('',[
        Validators.required,
        validatePassword,
        validateCredentials,
    ]),
  });

  submitLogin() {
      console.log( this.loginForm, '$event')
  }

}
