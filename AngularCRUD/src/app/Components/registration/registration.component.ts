import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: '../log-in/log-in.component.css'
})
export class RegistrationComponent {

  submitted = false;
  emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

  constructor() {

  }

  registrationform = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.maxLength(32), Validators.pattern(this.emailRegex)]),
    gender: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.maxLength(32), Validators.minLength(8)]),
    // confirmPassword: new FormControl('', [Validators.required], confirmPasswordValidator.confirmPasswordValidator(this.password, this.confirmedPassword).bind(this)),
  })

  getControl(name: any): AbstractControl | null {
    return this.registrationform.get(name)
  }

  onSubmit() {
    this.submitted = true;
    console.log("this.registrationform.value", this.registrationform.value);
    if (this.registrationform.invalid) {
      this.registrationform.markAllAsTouched();
      return;
    }

    console.log("Value", this.registrationform.value)

    // this.srv.registration(this.registrationform.value)
    this.registrationform.reset()
  }

}
