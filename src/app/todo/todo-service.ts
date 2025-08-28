import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }
  
  getTodos(): Observable <Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl + '/todos');
  }
  
  CreateTask(data: Todo): Observable <Todo> {
    return this.http.post<Todo>(this.apiUrl + '/todos', data);
  }

  updateTask(id: string, data: Todo): Observable <Todo> {
    return this.http.put<Todo>(this.apiUrl + '/todos/' + id, data);
  }

  findTask(id: String): Observable <Todo> {
    return this.http.get<Todo>(this.apiUrl + '/todos/' + id);
  }

  deleteTask(id: number): Observable <any> {
    return this.http.delete<any> (this.apiUrl + '/todos/' + id);
  }

  updateOrder(id: string, order: number): Observable<Todo> {
    return this.http.patch<Todo>(this.apiUrl + '/todos/' + id, { order });
  }

  updateTodoStatus(id: string | number, status: boolean): Observable<Todo> {
    return this.http.patch<Todo>(`${this.apiUrl}/todos/${id}`, { status });
  }

}
