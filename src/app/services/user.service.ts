import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  user!: User;

  isLoggedIn: boolean = false;

  setUser(data: any){
    this.user = data.data.student;
  }

  getUser(){
    return this.user;
  }
}

export interface User{
  info: {
    am: string,
    firstName: string,
    lastName: string,
    department: string,
    currentSemester: number,
    registrationYear: number,
    curriculum: string
  },
  grades: {
    totalPassedCourses: number,
    totalAverageGrade: number,
    totalEcts: number,
    courses: Course[]
  }
}

export interface Course{
  id: string,
  name: string,
  grade: number
}
