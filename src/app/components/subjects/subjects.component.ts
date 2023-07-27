import { TranslateService } from '@ngx-translate/core';
import { Course } from './../../services/user.service';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent {
  constructor(private userService: UserService, private fb: FormBuilder, public translateService: TranslateService){}

  grades: any;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<Course>;
  filteredResponse: any;
  searchForm!: FormGroup;
  searchSubscription!: Subscription;

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe(() => {
      this.paginator._intl.itemsPerPageLabel = this.translateService.instant('Subjects.subjects');
    });

    let user = this.userService.getUser();
    this.grades = user.grades;
    this.dataSource = new MatTableDataSource(this.grades.courses);
    this.filteredResponse = this.dataSource;
    this.searchForm = this.fb.group({
      searchQuery: [''],
      searchType: ['name']
    });

    this.searchSubscription = this.searchForm.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(formValue => {
        let query = formValue.searchQuery;
        let searchType = formValue.searchType;
        this.search(query, searchType);
      });
  }

  search(searchQuery: string, searchType: string) {
    if (searchQuery === '') {
      this.filteredResponse = this.dataSource;
    } else {
      this.filteredResponse = this.grades.courses.filter((course: { name: string; grade: number; id: string; }) => {
        if (searchType === 'name') return course.name.toLowerCase().includes(searchQuery.toLowerCase());
        else if (searchType === 'id') return course.id.toLowerCase().includes(searchQuery.toLowerCase());
        else if (searchType === 'grade1') return course.grade.toString() === searchQuery;
        else if (searchType === 'grade2') return course.grade.toString().startsWith(searchQuery);
        else if (searchType === 'grade3') {
        let rangeMatch = searchQuery.match(/^(\d+(\.\d+)?)\-(\d+(\.\d+)?)$/);
          if (rangeMatch) {
            let minGrade = parseFloat(rangeMatch[1]);
            let maxGrade = parseFloat(rangeMatch[3]);
            let grade = parseFloat(course.grade.toString());
            return grade >= minGrade && grade <= maxGrade;
          }
        }
        return this.dataSource;
      });
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.sort.sort(({ id: 'id', start: 'asc' }) as MatSortable);
      this.filteredResponse.paginator = this.paginator;
      this.filteredResponse.sort = this.sort;
    });
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
