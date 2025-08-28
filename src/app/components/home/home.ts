import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Token } from '../../token/token';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { User , UserResponse} from '../../user/user';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgIf],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements  OnInit  {

  user: UserResponse | null = null;

  constructor(private token: Token, private userService:User) {}

  ngOnInit(): void {
  if (this.isLoggedIn()) {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        console.log(user);
      },
      error: (err) => console.error('Failed to fetch user', err),
    });
  }
}

  isLoggedIn(): boolean {

    if (typeof window === 'undefined') {
      return false;
    }
    const token = this.token.get();
    return !!token;
  }

  get userName(): string {
    return this.user?.user_data.name ?? '';
  }


}
