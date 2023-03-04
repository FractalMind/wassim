import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {validateWeekPassword} from "../../validators/password.validator";
import {AuthService} from "../login/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss']
})
export class CreateUserPage {
  public showPassword = false;

  public createUserForm = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
      validateWeekPassword,
    ]),
  });

  constructor(private authService: AuthService,
              private router: Router,
  ) {
  }

  register() {
    if (this.createUserForm.valid) {
      this.authService.registerUserWithEmailAndPassword(
        this.createUserForm.value.email!,
        this.createUserForm.value.password!,
      )
        .then(() => {
          this.router.navigate(['/todo']);
        })
        .catch((e) => {
          this.createUserForm.controls.email.setErrors({[e.code]: true})
        })
    }
  }

}
