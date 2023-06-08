import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  neededCourses: any;
  @ViewChild('mandatoryPaginator') mandatoryPaginator!: MatPaginator;
  @ViewChild('basicPaginator') basicPaginator!: MatPaginator;
  @ViewChild('choiceFromSameBasicPaginator') choiceFromSameBasicPaginator!: MatPaginator;
  @ViewChild('choiceFromOtherBasicPaginator') choiceFromOtherBasicPaginator!: MatPaginator;
  @ViewChild('generalPaginator') generalPaginator!: MatPaginator;
  mandatoryCourses!: MatTableDataSource<any>;
  basicCourses!: MatTableDataSource<any>;
  choiceCoursesFromSameBasic!: MatTableDataSource<any>;
  choiceCoursesFromOtherBasic!: MatTableDataSource<any>;
  generalCourses!: MatTableDataSource<any>;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    let user = this.userService.getUser();
    this.neededCourses = user.grades.neededCourses;
    this.mandatoryCourses = new MatTableDataSource(this.neededCourses.mandatoryCoursesLeft);
    this.basicCourses = new MatTableDataSource(this.neededCourses.basicCoursesLeft);
    this.choiceCoursesFromSameBasic = new MatTableDataSource(this.neededCourses.choiceCoursesFromSameBasicLeft);
    this.choiceCoursesFromOtherBasic = new MatTableDataSource(this.neededCourses.choiceCoursesFromOtherBasicLeft);
    this.generalCourses = new MatTableDataSource(this.neededCourses.generalCoursesLeft);
  }

  ngAfterViewInit(){
    this.mandatoryCourses.paginator = this.mandatoryPaginator;
    this.basicCourses.paginator = this.basicPaginator;
    this.choiceCoursesFromSameBasic.paginator = this.choiceFromSameBasicPaginator;
    this.choiceCoursesFromOtherBasic.paginator = this.choiceFromOtherBasicPaginator;
    this.generalCourses.paginator = this.generalPaginator;
  }
}
