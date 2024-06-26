import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './header/header.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { ICE1Component } from './components/services/ICE1/ICE1.component';
import { N2Component } from './components/services/N2/N2.component';
import { N1Component } from './components/services/N1/N1.component';
import { PeirComponent } from './components/services/Peir/Peir.component';
import { ServicesComponent } from './components/services/services.component';
import { ImportComponent } from './components/import/import.component';
import { TranslateButtonComponent } from "./buttons/translate-button/translate-button.component";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        HeaderComponent,
        SubjectsComponent,
        ICE1Component,
        N2Component,
        N1Component,
        PeirComponent,
        ServicesComponent,
        ImportComponent,
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatCardModule,
        ReactiveFormsModule,
        MatSortModule,
        MatPaginatorModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        TranslateButtonComponent], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
