import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-translate-button',
  standalone: true,
  imports: [],
  templateUrl: './translate-button.component.html',
  styleUrl: './translate-button.component.scss',
})
export class TranslateButtonComponent {
  currentLang = 'EL';

  constructor(
    private translateService: TranslateService,
    private http: HttpClient
  ) {
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
        console.error(
          `Failed to load translation file for language '${lang}'.`
        );
      }
    );
  }

  switchLanguage(): void {
    let language = localStorage.getItem('preferredLanguage' || 'el');
    language = language === 'el' ? 'en' : 'el';
    localStorage.setItem('preferredLanguage', String(language));

    this.translateService.use(String(language));
    this.currentLang = language.toUpperCase();
  }

  currentRoute!: string;

  ngOnInit() {
    const language = localStorage.getItem('preferredLanguage');

    this.translateService.use(language || 'el');

    localStorage.setItem('preferredLanguage', language || 'el');
    if (language) {
      this.currentLang = language.toUpperCase();
    }
  }
}
