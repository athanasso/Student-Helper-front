import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './header/header.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { ICEComponent } from './components/services/ICE/ICE.component';
import { N2Component } from './components/services/N2/N2.component';
import { N1Component } from './components/services/N1/N1.component';
import { PeirComponent } from './components/services/Peir/Peir.component';
import { ServicesComponent } from './components/services/services.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SubjectsComponent,
    ICEComponent,
    N2Component,
    N1Component,
    PeirComponent,
    ServicesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
