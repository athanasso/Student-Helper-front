import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router) {}

  user!: User;
  emptyUser!: User;

  isLoggedIn: boolean = false;

  setUser(data: any){
    this.user = data.student;
  }

  getUser(){
    return this.user;
  }

  signOut(){
    this.user = this.emptyUser;
    this.isLoggedIn = false;
    this.router.navigate(['login']);
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
  status: string,
  lastDueDate: string
}
export interface Course{
  id: string,
  name: string,
  grade: number
}
