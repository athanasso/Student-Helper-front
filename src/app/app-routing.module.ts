import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { ServicesComponent } from './components/services/services.component';
import { ICEComponent } from './components/services/ICE/ICE.component';
import { N2Component } from './components/services/N2/N2.component';
import { N1Component } from './components/services/N1/N1.component';
import { PeirComponent } from './components/services/Peir/Peir.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'subjects', component: SubjectsComponent, canActivate: [AuthGuard]},
  { path: 'services', component: ServicesComponent, canActivate: [AuthGuard]},
  { path: 'services/ICE1', component: ICEComponent, canActivate: [AuthGuard]},
  { path: 'services/N2', component: N2Component, canActivate: [AuthGuard]},
  { path: 'services/N1', component: N1Component, canActivate: [AuthGuard]},
  { path: 'services/Peir', component: PeirComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
