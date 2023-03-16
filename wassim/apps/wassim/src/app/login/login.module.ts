import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginPage } from './login.page';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LoginPage],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginPage,
      },
    ]),
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    TranslateModule,
  ],
})
export class LoginModule {}
