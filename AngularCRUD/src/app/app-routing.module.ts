import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './Components/log-in/log-in.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { HomeComponent } from './Components/Sections/home/home.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:'/login',
    pathMatch: 'full'
  },
  {
    path: "login",
    component: LogInComponent
  },
  {
    path: "registration",
    component: RegistrationComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path:"**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
