import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "@firebase/auth";
import {AuthService} from "./login/services/auth.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Stelido';
  public user$: Observable<User | null> = this.authService.user$;

  constructor(private authService: AuthService,
              private router: Router,
              public translationService: TranslateService,
  ) {
    this.authService.refreshUser();
    this.translationService.use(localStorage.getItem('language') || 'en');
  }

  public async signout() {
    await this.authService.signOutUser();
    this.router.navigate(['/login']);
  }

  public changeLanguage(i18n: string) {
    this.translationService.use(i18n);
    localStorage.setItem('language', i18n);
  }
}
