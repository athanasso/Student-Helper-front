import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router) {}

  setUser(data: any){
    localStorage.setItem('user', JSON.stringify(data.student));
  }

  getUser(){
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  signOut(){
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
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
