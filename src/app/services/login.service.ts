import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly logEndPoint = "http://localhost:8080/student_helper/api/student";
  //private readonly logEndPoint = "https://student-helper-api.vercel.app/student_helper/api/student";

  constructor(private http: HttpClient) { }

  getUser(username: string, password: string){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

    const data = {"username": username, "password": password};
    return this.http.post(this.logEndPoint, data);
  }
}
