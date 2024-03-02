import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  url = 'http://localhost:3000';

  constructor(private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router) { }

  isLoggedIn(): boolean {
    const students = localStorage.getItem('students')
    return students ? true : false;
  }

  registration(data: any) {
    return this.http.post(this.url + '/register', data);
  }

  login(data: any) {
    return this.http.post<any>(this.url + '/login', data, { observe: 'response' })
    .subscribe({
      next: (response) => {
        localStorage.setItem("students", JSON.stringify(response.body.Student));
        localStorage.setItem("token", JSON.stringify(response.body.token));
        this.router.navigate(["/home"]);
      },
      error: (error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred.'; // Default message\
        if (error.error && error.error.error) {
          errorMessage = error.error.error;
        } else if (error.statusText) {
          errorMessage = error.statusText;
        }

        this.snackBar.open(errorMessage, '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-error'],
        });
      }
    })
  }
  
  getData() {
    return this.http.get<any>(this.url + '/students')
  }
  
  deleteData(id: string) {
    return this.http.delete<any>(this.url + `/students/${id}`)
  }
  
  approve(id: string) {
    return this.http.put<any>(this.url + `/students/approve/${id}`,'')
  }

}
