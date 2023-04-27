import { Course } from './../../services/user.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent {
  constructor(private userService: UserService, private fb: FormBuilder){}

  grades: any;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<Course>;
  filteredResponse: any;
  searchForm!: FormGroup;
  searchSubscription!: Subscription;

  ngOnInit(): void {
    let user = this.userService.getUser();
    this.grades = user.grades;
    this.dataSource = new MatTableDataSource(this.grades.courses);
    this.filteredResponse = this.dataSource;

    this.searchForm = this.fb.group({
      searchQuery: ['']
    });
    this.searchSubscription = this.searchForm.get('searchQuery')!.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(query => {
        this.search(query);
      });
  }

  search(searchQuery: string) {
    if (!searchQuery) {
      this.filteredResponse = this.dataSource;
    } else {
      this.filteredResponse = this.grades.courses.filter((course: { name: string; grade: number; id: string; }) => {
        return course.name.toLowerCase().includes(searchQuery.toLowerCase())
        || course.grade == parseInt(searchQuery)
        || course.id.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }
  }

  ngAfterViewInit() {
    this.filteredResponse.paginator = this.paginator;
    this.filteredResponse.sort = this.sort;
  }

  pageSize = 10;
  pageIndex = 0;

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
