import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-N1',
  templateUrl: './N1.component.html',
  styleUrls: ['../services.css']
})
export class N1Component {
  neededCourses: any;
  @ViewChild('mandatoryPaginator') mandatoryPaginator!: MatPaginator;
  @ViewChild('choiceCoursesLeft') choiceCoursesPaginator!: MatPaginator;
  mandatoryCourses!: MatTableDataSource<any>;
  choiceCoursesLeft!: MatTableDataSource<any>;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    let user = this.userService.getUser();
    this.neededCourses = user.grades.neededCourses;
    this.mandatoryCourses = new MatTableDataSource(this.neededCourses.mandatoryCoursesLeft);
    this.choiceCoursesLeft = new MatTableDataSource(this.neededCourses.choiceCoursesLeft);
  }

  ngAfterViewInit(){
    this.mandatoryCourses.paginator = this.mandatoryPaginator;
    this.choiceCoursesLeft.paginator = this.choiceCoursesPaginator;
  }
}
