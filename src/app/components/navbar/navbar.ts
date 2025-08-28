import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Token } from '../../token/token';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule, NgIf],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar{

  constructor(private token:Token, private router:Router) {}

  isLoggedIn(): boolean {
    const token = this.token.get();
    return !!token;
  }

  logout(): void {
    this.token.remove();
    this.router.navigate(['/login']);
  }
}

