import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StudentService } from '../Services/Students/student.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(StudentService)
  const router = inject(Router)
  if(authService.isLoggedIn()) {
    return true;
  }else{
    router.navigate(['/login']);
    return false;
  }
};
