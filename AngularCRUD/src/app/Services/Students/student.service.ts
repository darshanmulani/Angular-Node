import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  registration(data: any) {
    return this.http.post(this.url + '/register', data);
  }

  login(data: any) {
    return this.http.post<any>(this.url + '/login', data);
  }
}
