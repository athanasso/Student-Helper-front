import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  private readonly importEndPoint = "http://localhost:8080/student_helper/api/student/import";

  constructor(private http: HttpClient) { }

  getUser(formData: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.importEndPoint, formData, { headers: headers });
  }
}
