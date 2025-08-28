import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../user/user';
import { Token } from '../../token/token';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  error = '';

  public forms = {
    email: null,
    password: null
  }

  constructor(private user: User, private token: Token, private router: Router) { }

  loginUser(){

    if(!this.forms.email || !this.forms.password){
      this.error = 'All fields are required.';
      console.log(this.error);
      return;
    }

    // Simple email regex validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.forms.email)) {
      this.error = 'Please enter a valid email address.';
      return;
    }

    return this.user.Login(this.forms).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data: any) {
    this.token.handle(data.access_token);
    this.router.navigateByUrl('/');
  }

  handleError(err: any) {
    console.error('Login error:', err);

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
    } else if (err.status === 401) {
      // Handle unauthorized error specifically
      this.error = err.error?.message || 'Invalid credentials.';
    } else {
      this.error = 'Server error. Please try again later.';
    }
  }


}
