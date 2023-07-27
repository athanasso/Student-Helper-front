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

  isGreek!:boolean;
  showMenu:boolean = false;

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  constructor(private router: Router, private service: UserService, private translateService: TranslateService, private http: HttpClient) {
    this.translateService.setDefaultLang('el');
    this.translateService.use('el'); // Load translations for the default language
    localStorage.setItem('preferredLanguage','el');
    // Load additional translation files
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

  switchLanguage(event: Event): void {
    const isChecked = !((event.target as HTMLInputElement).checked);

    localStorage.setItem('preferredLanguage', isChecked ? 'el' : 'en');

    this.translateService.use(isChecked ? 'el' : 'en');
  }

  currentRoute!: string;

  ngOnInit() {
    const savedLanguage = localStorage.getItem('preferredLanguage');

    this.isGreek = savedLanguage === 'el';
    this.translateService.use(savedLanguage || 'el');

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
