import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../user/user';
import { Router, RouterModule } from '@angular/router';


interface SignupForms {
  name: string,
  email: string,
  password: string,
  password_confirmation: string;
}

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterModule ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup {

  error = '';

  constructor(private user: User, private router: Router) { }

  public forms: SignupForms = {
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  }

  SignUpUser(){

    this.error = '';

    // 1. Required check
    if (!this.forms.name || !this.forms.email || !this.forms.password || !this.forms.password_confirmation) {
      this.error = 'All fields are required.';
      return;
    }

    // 2. Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.forms.email)) {
      this.error = 'Please enter a valid email address.';
      return;
    }

    // 3. Password match
    if (this.forms.password !== this.forms.password_confirmation) {
      this.error = 'Passwords do not match.';
      return;
    }

    // 4. Password minimum length
    if (this.forms.password.length < 6) {
      this.error = 'Password must be at least 6 characters long.';
      return;
    }

    console.log('Form submitted:', this.forms);

    return this.user.SignUp(this.forms).subscribe({
      next: (res) => {
        console.log('Signup success:', res);
        // You can redirect or show success message here

        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Signup error:', err);

        // Laravel returns validation errors in err.error.errors
        if (err.error && err.error.errors) {
          const errors = err.error.errors;

          // Pick first error message to display
          if (errors.email) {
            this.error = errors.email[0];
          } else if (errors.password) {
            this.error = errors.password[0];
          } else {
            this.error = 'Something went wrong. Please try again.';
          }
        } else {
          this.error = 'Server error. Please try again later.';
        }
      }
    });
  }
}
