import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface UserResponse {
  user_id: number;
  user_data: {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class User {
  
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  SignUp(data: any) {
    return this.http.post( this.apiUrl + '/signup' , data);
  }

  Login(data: any): Observable<any> {
    return this.http.post( this.apiUrl + '/login' , data);
  }

  getCurrentUser(): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.apiUrl + '/me', {});
  }

}
