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
  @ViewChild('choiceFromSameBasic1Paginator') choiceFromSameBasicPaginator!: MatPaginator;
  @ViewChild('choiceFromOtherBasicPaginator') choiceFromOtherBasicPaginator!: MatPaginator;

  mandatoryCourses!: MatTableDataSource<any>;
  basicCourses!: MatTableDataSource<any>;
  choiceCoursesFromSameBasic!: MatTableDataSource<any>;
  choiceCoursesFromOtherBasic!: MatTableDataSource<any>;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    let user = this.userService.getUser();
    this.neededCourses = user.grades.neededCourses;
    this.mandatoryCourses = new MatTableDataSource(this.neededCourses.mandatoryCoursesLeft);
    this.basicCourses = new MatTableDataSource(this.neededCourses.basicCoursesLeft);
    this.choiceCoursesFromSameBasic = new MatTableDataSource(this.neededCourses.choiceCoursesLeft);
    this.choiceCoursesFromOtherBasic = new MatTableDataSource(this.neededCourses.choiceFromOthersBasicAvailable);
  }

  ngAfterViewInit(){
    this.mandatoryCourses.paginator = this.mandatoryPaginator;
    this.basicCourses.paginator = this.basicPaginator;
    this.choiceCoursesFromSameBasic.paginator = this.choiceFromSameBasicPaginator;
    this.choiceCoursesFromOtherBasic.paginator = this.choiceFromOtherBasicPaginator;
  }
}
