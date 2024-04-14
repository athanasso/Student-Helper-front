import { RephreshService } from './rephresh.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private timeoutId: any; // Variable to store the timeout ID
  private refreshSubscription!: Subscription;

  constructor(private router: Router, private rephreshService: RephreshService) {}

  startRefreshing(cookies: Cookies) {
    // Check if the user is logged in
    if (!cookies || !this.isLoggedIn) return;

    console.log('Refreshing...');

    // Stop any existing refresh subscription
    this.stopRefreshing();

    // Start a new subscription to periodically refresh
    this.refreshSubscription = interval(5 * 1000) // 5 minutes interval
      .pipe(
        switchMap(() => this.rephreshService.getUser(cookies)),
        tap((data: any) => {
          // Check if the received data is valid
          if (data && data.student) {
            console.log('Data received:');
            // Update the user data in local storage
            localStorage.setItem('user', JSON.stringify(data.student));
            this.scheduleLocalStorageDeletion(); // Schedule local storage deletion
          }
        })
      )
      .subscribe();
}

stopRefreshing() {
    // Unsubscribe from any existing refresh subscription
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
}

  setUser(data: any) {
    localStorage.setItem('user', JSON.stringify(data.student));
    this.scheduleLocalStorageDeletion(); // Schedule local storage deletion

    if (data.cookies) {
      localStorage.setItem('cookies', JSON.stringify(data.cookies));
      this.startRefreshing(data.cookies);
    }
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  signOut() {
    localStorage.removeItem('user');
    this.clearLocalStorageDeletion(); // Clear scheduled local storage deletion
    this.router.navigate(['login']);
    localStorage.clear();
    this.stopRefreshing();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  private scheduleLocalStorageDeletion() {
    this.clearLocalStorageDeletion(); // Clear any existing timeout

    const timeDelay = 30 * 60 * 1000; // Time delay in milliseconds (30 minutes)

    this.timeoutId = setTimeout(() => {
      localStorage.removeItem('user');
      console.log('Local storage deleted after 30 minutes.');
    }, timeDelay);
  }

  private clearLocalStorageDeletion() {
    clearTimeout(this.timeoutId);
  }
}

export interface User{
  info: Info,
  grades: Grades,
  cookies: Cookies
}

export interface Info{
  am: string,
  firstName: string,
  lastName: string,
  department: string,
  currentSemester: number,
  registrationYear: number,
  curriculum: string,
  flow: string,
  curriculumCode: string,
  deletionYear: string,
  thesis: Thesis
}

export interface Grades{
  totalPassedCourses: number,
  totalAverageGrade: number,
  totalEcts: number,
  courses: Course[],
  neededCourses: any
}

export interface Thesis{
  title: string,
  code: string,
  assignmentDate: string,
  completionDate: string,
  examDate: string,
  status: string
}
export interface Course{
  id: string,
  name: string,
  grade: number
}

export interface Cookies{
  cookie: string,
  xProfile: string,
  _csrf: string
}
