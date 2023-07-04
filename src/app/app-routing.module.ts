import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { ServicesComponent } from './components/services/services.component';
import { ICE1Component } from './components/services/ICE1/ICE1.component';
import { N2Component } from './components/services/N2/N2.component';
import { N1Component } from './components/services/N1/N1.component';
import { PeirComponent } from './components/services/Peir/Peir.component';
import { ICE1Guard } from './guards/curriculum/ICE1.guard';
import { N2Guard } from './guards/curriculum/N2.guard';
import { N1Guard } from './guards/curriculum/N1.gaurd';
import { PeirGuard } from './guards/curriculum/Peir.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'subjects', component: SubjectsComponent, canActivate: [AuthGuard]},
  { path: 'services', component: ServicesComponent, canActivate: [AuthGuard]},
  { path: 'services/ICE1', component: ICE1Component, canActivate: [AuthGuard, ICE1Guard]},
  { path: 'services/N2', component: N2Component, canActivate: [AuthGuard, N2Guard]},
  { path: 'services/N1', component: N1Component, canActivate: [AuthGuard, N1Guard]},
  { path: 'services/Peir', component: PeirComponent, canActivate: [AuthGuard, PeirGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
