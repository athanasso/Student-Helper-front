import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImportService } from 'src/app/services/import.service';
import { UserService } from 'src/app/services/user.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent {

  importForm!: FormGroup;
  curriculum: string = '';
  registrationYear: string = '';
  fileUploaded: boolean = false;
  courses: any[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private service: ImportService, private userService: UserService) {}

  ngOnInit(): void {
    this.importForm = this.formBuilder.group({
      curriculum: ['', Validators.required],
      registrationYear: [''],
    });
  }

  onFileInput(event: any): void {
    const target: DataTransfer = <DataTransfer>(event.target);

    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const sheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

      // Iterate through rows starting from the third row
      if (worksheet['!ref'] !== undefined) {
        for (let i = 2; i < XLSX.utils.decode_range(worksheet['!ref']).e.r; i++) {
          const id: string = worksheet[XLSX.utils.encode_cell({ r: i, c: 0 })]?.v || '';
          const name: string = worksheet[XLSX.utils.encode_cell({ r: i, c: 1 })]?.v || '';
          let grade: number = worksheet[XLSX.utils.encode_cell({ r: i, c: 2 })]?.v || 0;
          const ects: number = worksheet[XLSX.utils.encode_cell({ r: i, c: 11 })]?.v || 0;

          // Adjust the grade if it's greater than 10 (assuming it shouldn't exceed 10)
          if (grade > 10) {
            grade = grade / 10; // Convert to a decimal value
          }

          // Transform data into JSON format
          const course  = {
            id: id,
            name: name,
            grade: grade,
            ects: ects
          };

          this.courses.push(course);
        }
        this.fileUploaded = true;
      }
    };
    reader.readAsBinaryString(target.files[0]);
  }

  isFormValid(): boolean {
    return this.importForm.valid && this.courses.length > 0;
  }

  switch() {
    this.router.navigate(['login']);
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      const formData = {
        curriculum: this.importForm.value.curriculum,
        registrationYear: this.importForm.value.registrationYear,
        courses: this.courses
      };

      this.service.getUser(formData).subscribe(
          (data) => {
            this.userService.setUser(data);
            this.router.navigate(['home']);
          },
          (error) => {
            console.log(error);
            // this.error = error.statusText;
            // this.openSnackBar(this.error);
          }
        );
      }
    }
}
