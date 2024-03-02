import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../Services/Students/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  isLoggedIn = false;
  studentsData: any;
  student: any;
  displayedColumns: any;
  
  constructor(
    private srv: StudentService,
    private router: Router) {
    }
    ngOnInit(): void {
      this.getData();
      const data:any = localStorage.getItem('students')
      this.student = JSON.parse(data);
      if(this.student.role == 'admin') {
        this.displayedColumns = ['position', 'name', 'email', 'gender', 'action'];
      }else{
        this.displayedColumns = ['position', 'name', 'email', 'gender'];
      }
  }

  getData() {
    this.srv.getData().subscribe((res) => {
      this.studentsData = res
    });
  }

  approve(id: string) {
    this.srv.approve(id).subscribe((res) => {
      this.getData()
    })
  }

  delete(id:string){
    this.srv.deleteData(id).subscribe((res) => {
      this.getData()
    })
  }

  logOut(){
    localStorage.removeItem('students')
    this.router.navigate(['login']);
  }

}
