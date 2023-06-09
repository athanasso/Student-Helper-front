import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-N1',
  templateUrl: './N1.component.html',
  styleUrls: ['./N1.component.scss']
})
export class N1Component {
  neededCourses: any;
  @ViewChild('mandatoryPaginator') mandatoryPaginator!: MatPaginator;
  @ViewChild('choiceCourses1Left') choiceCourses1Paginator!: MatPaginator;
  @ViewChild('choiceCourses2Left') choiceCourses2Paginator!: MatPaginator;
  mandatoryCourses!: MatTableDataSource<any>;
  choiceCourses1!: MatTableDataSource<any>;
  choiceCourses2!: MatTableDataSource<any>;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    let user = this.userService.getUser();
    this.neededCourses = user.grades.neededCourses;
    this.mandatoryCourses = new MatTableDataSource(this.neededCourses.mandatoryCoursesLeft);
    this.choiceCourses1 = new MatTableDataSource(this.neededCourses.choiceCourses1Left);
    this.choiceCourses2 = new MatTableDataSource(this.neededCourses.choiceCourses2Left);
  }

  ngAfterViewInit(){
    this.mandatoryCourses.paginator = this.mandatoryPaginator;
    this.choiceCourses1.paginator = this.choiceCourses1Paginator;
    this.choiceCourses2.paginator = this.choiceCourses2Paginator;
  }
}
