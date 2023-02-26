import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginPage } from './login.page';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
  declarations: [ LoginPage ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path:'',
      component: LoginPage
    }]),
    ReactiveFormsModule,
    MatFormFieldModule,
  ]
})
export class LoginModule { }
