import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class Token {


  constructor( private http: HttpClient) { }
  
  handle(token: any) {
    this.set(token);
    console.log(this.isValid());  
  }

  set(token: any) {
    return localStorage.setItem('token', token);
  }

  get() {
    return localStorage.getItem('token');
  }
  remove() {
    localStorage.removeItem('token');
  }

  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return (payload.iss === 'http://127.0.0.1:8000/api/login') ? true : false;
      }
      return false;
    }
    return false;
  }

  payload(token: any) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload: any) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }

  // --------------------------
  // Now these work because http is injected

  getTodos() {
  return this.http.get('/api/todos');  // No need to manually add token
  }

  createTodo(todo: any) {
    return this.http.post('/api/todos', todo);
  }
}

