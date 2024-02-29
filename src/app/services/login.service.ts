import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly loginEndpoint = environment.loginEndpoint;

  constructor(private http: HttpClient) { }

  getUser(username: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(username + ':' + password)
    });

    const data = { "username": username, "password": password };
    return this.http.post(this.loginEndpoint, data, { headers: headers });
  }
}
