import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router) {}

  user: User = {
    info: {
      am: "",
      firstName: "",
      lastName: "",
      department: "",
      currentSemester: 0,
      registrationYear: 0,
      curriculum: "",
      deletionYear: "",
    },
    grades: {
      totalPassedCourses: 0,
      totalAverageGrade: 0,
      totalEcts: 0,
      courses: []
    }
  };

  isLoggedIn: boolean = false;

  setUser(data: any){
    this.user = data.student;
  }

  getUser(){
    return this.user;
  }

  signOut(){
    this.user = {
      info: {
        am: "",
        firstName: "",
        lastName: "",
        department: "",
        currentSemester: 0,
        registrationYear: 0,
        curriculum: "",
        deletionYear: ""
      },
      grades: {
        totalPassedCourses: 0,
        totalAverageGrade: 0,
        totalEcts: 0,
        courses: []
      }
    };
    this.isLoggedIn = false;
    this.router.navigate(['login']);
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
    curriculum: string,
    deletionYear: string
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
