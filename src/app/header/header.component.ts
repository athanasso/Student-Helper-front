import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  showMenu:boolean = false;
  isEnglish: boolean = false;

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  constructor(private router: Router, private service: UserService, private translateService: TranslateService, private http: HttpClient) {
    this.translateService.setDefaultLang('el');
    this.translateService.use('el');

    this.loadTranslation('en');
    this.loadTranslation('el');
  }

  loadTranslation(lang: string): void {
    this.http.get<any>(`../assets/i18n/${lang}.json`).subscribe(
      (translations: any) => {
        this.translateService.setTranslation(lang, translations);
      },
      (error: any) => {
        console.error(`Failed to load translation file for language '${lang}'.`);
      }
    );
  }

  switchLanguage(): void {
    let language = localStorage.getItem('preferredLanguage' || 'el');
    language = language === 'el' ? 'en' : 'el';
    localStorage.setItem('preferredLanguage', String(language));

    this.translateService.use(String(language));

    let flag = localStorage.getItem('flag');
    this.isEnglish = flag == 'true';
    flag = String(!this.isEnglish);
    localStorage.setItem('flag', String(flag));
  }

  currentRoute!: string;

  ngOnInit() {
    const language = localStorage.getItem('preferredLanguage');
    const flag = localStorage.getItem('flag');

    this.translateService.use(language || 'el');
    this.isEnglish = Boolean(flag || false);
    localStorage.setItem('preferredLanguage', language || 'el')
    localStorage.setItem('flag', flag || 'false')

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  signOut() {
    this.service.signOut();
  }
}
