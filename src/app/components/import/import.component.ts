import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImportService } from 'src/app/services/import.service';
import { UserService } from 'src/app/services/user.service';
import readXlsxFile from 'read-excel-file';
@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent {

  importForm!: FormGroup;
  curriculum: string = '';
  registrationYear: string = '';
  fileUploaded: boolean = false;
  courses: any[] = [];
  error: string = '';

  constructor(private router: Router, private formBuilder: FormBuilder, private service: ImportService, private userService: UserService) {}

  ngOnInit(): void {
    this.importForm = this.formBuilder.group({
      curriculum: ['', Validators.required],
      registrationYear: [''],
    });
  }

  onFileInput(event: any): void {
    const target: DataTransfer = <DataTransfer>(event.target);

    if (target.files.length !== 1) throw new Error('Please select a file');

    const file = target.files[0];

    // Check if the file is an Excel file (xlsx)
    if (!file.name.endsWith('.xlsx')) {
      console.error('Please upload a .xlsx file.');
      this.error = 'Please upload a .xlsx file.';
      return;
    }

    // Clear the existing courses array if a second file is uploaded
    if (this.courses.length > 0) {
      this.courses = [];
    }

    readXlsxFile(file).then((rows) => {
      // Iterate through each row starting from the third row (index 2)
      for (let i = 2; i < rows.length; i++) {
        const row = rows[i];

        // Extracting data from each row
        const id: string = row[0]?.toString() || '';
        const name: string = row[1]?.toString() || '';
        let grade: number = Number(row[2]) || 0;
        const ects: number = Number(row[11]) || 0;

        // Adjust the grade if it's greater than 10 (assuming it shouldn't exceed 10)
        if (grade > 10) {
          grade = grade / 10; // Convert to a decimal value
        }

        // Transform data into JSON format
        const course = {
          id: id,
          name: name,
          grade: grade,
          ects: ects
        };

        // Add the course to the courses array
        this.courses.push(course);
      }

      // Mark file upload as completed
      this.fileUploaded = true;
    }).catch((error) => {
      console.error('Error reading Excel file:', error);
      this.error = 'Error reading Excel file.';
    });
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
            this.error = error.statusText;
          }
        );
      }
    }
}
