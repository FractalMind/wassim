import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {

  public loginForm = new FormGroup({
    email: new FormControl('test@test.com', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('Mypassword007?', [
      Validators.required,
    ]),
  });

  constructor(private authService: AuthService,
              private router: Router,
  ) {
  }

  async submitLogin() {
    if (this.loginForm.valid) {
      await this.authService.signInWithEmailAndPassword(
        this.loginForm.value.email!,
        this.loginForm.value.password!
      ).then(() => {
        this.router.navigate(['/todo']);
      }).catch(e => {
        this.loginForm.controls.email.setErrors({[e.code]: true});
      });
    }
  }

}
