import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  private readonly importEndPoint = environment.importEndPoint;

  constructor(private http: HttpClient) { }

  getUser(formData: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.importEndPoint, formData, { headers: headers });
  }
}
