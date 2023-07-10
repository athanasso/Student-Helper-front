import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-N2',
  templateUrl: './N2.component.html',
  styleUrls: ['../services.css']
})
export class N2Component {
  neededCourses: any;
  @ViewChild('mandatoryPaginator') mandatoryPaginator!: MatPaginator;
  @ViewChild('basicPaginator') basicPaginator!: MatPaginator;
  @ViewChild('choiceFromSameBasic1Paginator') choiceFromSameBasic1Paginator!: MatPaginator;
  @ViewChild('choiceFromSameBasic2Paginator') choiceFromSameBasic2Paginator!: MatPaginator;
  @ViewChild('choiceFromOtherBasicPaginator') choiceFromOtherBasicPaginator!: MatPaginator;

  mandatoryCourses!: MatTableDataSource<any>;
  basicCourses!: MatTableDataSource<any>;
  choiceCoursesFromSameBasic1!: MatTableDataSource<any>;
  choiceCoursesFromSameBasic2!: MatTableDataSource<any>;
  choiceCoursesFromOtherBasic!: MatTableDataSource<any>;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    let user = this.userService.getUser();
    this.neededCourses = user.grades.neededCourses;
    this.mandatoryCourses = new MatTableDataSource(this.neededCourses.mandatoryCoursesLeft);
    this.basicCourses = new MatTableDataSource(this.neededCourses.basicCoursesLeft);
    this.choiceCoursesFromSameBasic1 = new MatTableDataSource(this.neededCourses.choice1CoursesLeft);
    this.choiceCoursesFromSameBasic2 = new MatTableDataSource(this.neededCourses.choice2CoursesLeft);
    this.choiceCoursesFromOtherBasic = new MatTableDataSource(this.neededCourses.choiceFromOthersBasicAvailable);
  }

  ngAfterViewInit(){
    this.mandatoryCourses.paginator = this.mandatoryPaginator;
    this.basicCourses.paginator = this.basicPaginator;
    this.choiceCoursesFromSameBasic1.paginator = this.choiceFromSameBasic1Paginator;
    this.choiceCoursesFromSameBasic2.paginator = this.choiceFromSameBasic2Paginator;
    this.choiceCoursesFromOtherBasic.paginator = this.choiceFromOtherBasicPaginator;
  }
}
