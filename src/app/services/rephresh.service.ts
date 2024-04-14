import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Cookies } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RephreshService {

  private readonly rephreshEndPoint = environment.rephreshEndPoint;

  constructor(private http: HttpClient) { }

  getUser(cookies: Cookies) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const cookiesJsonString = JSON.stringify(cookies);

    return this.http.post(this.rephreshEndPoint, { cookies: cookiesJsonString }, { headers: headers });
  }
}
