import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ice1',
  templateUrl: './ICE1.component.html',
  styleUrls: ['../services.css']
})
export class ICE1Component {
  neededCourses: any;
  @ViewChild('mandatoryPaginator') mandatoryPaginator!: MatPaginator;
  @ViewChild('choiceFromSameBasicForSoftwarePaginator') choiceFromSameBasicForSoftwarePaginator!: MatPaginator;
  @ViewChild('choiceFromOtherBasicForSoftwarePaginator') choiceFromOtherBasicForSoftwarePaginator!: MatPaginator;
  @ViewChild('choiceFromSameBasicForHardwarePaginator') choiceFromSameBasicForHardwarePaginator!: MatPaginator;
  @ViewChild('choiceFromOtherBasicForHardwarePaginator') choiceFromOtherBasicForHardwarePaginator!: MatPaginator;
  @ViewChild('choiceFromSameBasicForNetworkPaginator') choiceFromSameBasicForNetworkPaginator!: MatPaginator;
  @ViewChild('choiceFromOtherBasicForNetworkPaginator') choiceFromOtherBasicForNetworkPaginator!: MatPaginator;
  @ViewChild('generalPaginator') generalPaginator!: MatPaginator;

  mandatoryCourses!: MatTableDataSource<any>;
  basicCoursesForSoftware!: MatTableDataSource<any>;
  choiceCoursesFromSameBasicForSoftware!: MatTableDataSource<any>;
  choiceCoursesFromOtherBasicForSoftware!: MatTableDataSource<any>;
  basicCoursesForHardware!: MatTableDataSource<any>;
  choiceCoursesFromSameBasicForHardware!: MatTableDataSource<any>;
  choiceCoursesFromOtherBasicForHardware!: MatTableDataSource<any>;
  basicCoursesForNetwork!: MatTableDataSource<any>;
  choiceCoursesFromSameBasicForNetwork!: MatTableDataSource<any>;
  choiceCoursesFromOtherBasicForNetwork!: MatTableDataSource<any>;
  generalCourses!: MatTableDataSource<any>;

  selectForm!: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder){}

  ngOnInit(): void {
    this.selectForm = this.fb.group({
      selectedOption: ['']
    });

    let user = this.userService.getUser();
    this.neededCourses = user.grades.neededCourses;
    this.mandatoryCourses = new MatTableDataSource(this.neededCourses.mandatoryCoursesLeft);
    this.basicCoursesForSoftware = new MatTableDataSource(this.neededCourses.basicCoursesLeftForSoftware);
    this.choiceCoursesFromSameBasicForSoftware = new MatTableDataSource(this.neededCourses.choiceCoursesFromSameBasicLeftForSoftware);
    this.choiceCoursesFromOtherBasicForSoftware = new MatTableDataSource(this.neededCourses.choiceCoursesFromOtherBasicLeftForSoftware);
    this.basicCoursesForHardware = new MatTableDataSource(this.neededCourses.basicCoursesLeftForHardware);
    this.choiceCoursesFromSameBasicForHardware = new MatTableDataSource(this.neededCourses.choiceCoursesFromSameBasicLeftForHardware);
    this.choiceCoursesFromOtherBasicForHardware = new MatTableDataSource(this.neededCourses.choiceCoursesFromOtherBasicLeftForHardware);
    this.basicCoursesForNetwork = new MatTableDataSource(this.neededCourses.basicCoursesLeftForNetwork);
    this.choiceCoursesFromSameBasicForNetwork = new MatTableDataSource(this.neededCourses.choiceCoursesFromSameBasicLeftForNetwork);
    this.choiceCoursesFromOtherBasicForNetwork = new MatTableDataSource(this.neededCourses.choiceCoursesFromOtherBasicLeftForNetwork);
    this.generalCourses = new MatTableDataSource(this.neededCourses.generalCoursesLeft);
  }

  ngAfterViewInit(){
    this.mandatoryCourses.paginator = this.mandatoryPaginator;
    this.choiceCoursesFromSameBasicForSoftware.paginator = this.choiceFromSameBasicForSoftwarePaginator;
    this.choiceCoursesFromOtherBasicForSoftware.paginator = this.choiceFromOtherBasicForSoftwarePaginator;
    this.choiceCoursesFromSameBasicForHardware.paginator = this.choiceFromSameBasicForHardwarePaginator;
    this.choiceCoursesFromOtherBasicForHardware.paginator = this.choiceFromOtherBasicForHardwarePaginator;
    this.choiceCoursesFromSameBasicForNetwork.paginator = this.choiceFromSameBasicForNetworkPaginator;
    this.choiceCoursesFromOtherBasicForNetwork.paginator = this.choiceFromOtherBasicForNetworkPaginator;
    this.generalCourses.paginator = this.generalPaginator;
  }
}
