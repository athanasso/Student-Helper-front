import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private timeoutId: any; // Variable to store the timeout ID

  constructor(private router: Router) {}

  setUser(data: any) {
    localStorage.setItem('user', JSON.stringify(data.student));
    this.scheduleLocalStorageDeletion(); // Schedule local storage deletion
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
  grades: Grades
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
