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
      courses: [],
      neededCourses: {
        choiceCoursesNeeded: 0,
        mandatoryCoursesNeeded: 0,
        mandatoryCoursesLeft: [],
        basicCoursesNeeded: 0,
        basicCoursesLeft: [],
        choiceCoursesFromSameBasicNeeded: 0,
        choiceCoursesFromSameBasicLeft: [],
        choiceCoursesFromOtherBasicAvailable: 0,
        choiceCoursesFromOtherBasicLeft: [],
        generalCoursesPassed: 0,
        generalCoursesLeft: []}
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
        courses: [],
        neededCourses: {
          choiceCoursesNeeded: 0,
          mandatoryCoursesNeeded: 0,
          mandatoryCoursesLeft: [],
          basicCoursesNeeded: 0,
          basicCoursesLeft: [],
          choiceCoursesFromSameBasicNeeded: 0,
          choiceCoursesFromSameBasicLeft: [],
          choiceCoursesFromOtherBasicAvailable: 0,
          choiceCoursesFromOtherBasicLeft: [],
          generalCoursesPassed: 0,
          generalCoursesLeft: []
        }
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
    courses: Course[],
    neededCourses: NeededCourses
  }
}

export interface Course{
  id: string,
  name: string,
  grade: number
}

export interface NeededCourses{
  choiceCoursesNeeded: number,
  mandatoryCoursesNeeded: number,
  mandatoryCoursesLeft: {
    id: string,
    name: string
  }[],
  basicCoursesNeeded: number,
  basicCoursesLeft: {
    id: string,
    name: string
  }[],
  choiceCoursesFromSameBasicNeeded: number,
  choiceCoursesFromSameBasicLeft: {
    id: string,
    name: string
  }[],
  choiceCoursesFromOtherBasicAvailable: number,
  choiceCoursesFromOtherBasicLeft: {
    id: string,
    name: string
  }[],
  generalCoursesPassed: number,
  generalCoursesLeft: {
    id: string,
    name: string
  }[]
}
