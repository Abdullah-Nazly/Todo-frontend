import { Component } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo-service';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-index',
  imports: [RouterModule, DatePipe],
  templateUrl: './index.html',
  styleUrl: './index.scss'
})
export class Index {

  todos: Todo[] = [];

  constructor(private todoService: TodoService){}

  ngOnInit() {
    this.loadTasks();
  }

  deletePost(id: number) {
    if (confirm("Are you sure you want to delete this task?")) {
      this.todoService.deleteTask(id).subscribe(() => {
        this.loadTasks();
      });
    }
  }

  loadTasks(){
    this.todoService.getTodos().subscribe((data: Todo[]) =>{
      this.todos = data;
    });
  }

  toggleStatus(todo: Todo) {
    const confirmed = confirm(
      `Are you sure you want to mark this task as ${todo.status ? 'incomplete' : 'complete'}?`
    );

    if (!confirmed) {
      return; 
    }

    // Optimistic update for immediate UI feedback
    const originalStatus = todo.status;
    todo.status = !todo.status;

    // Helper to format date for MySQL TIMESTAMP
    const formatDateTimeForMySQL = (date: Date) => {
      return date.toISOString().slice(0, 19).replace('T', ' ');
    };

    this.todoService.updateTodoStatus(todo.id, todo.status)
      .subscribe({
        next: (res) => {
          console.log('Status updated', res);
          // Set updated_date in MySQL TIMESTAMP format
          todo.updated_date = formatDateTimeForMySQL(new Date());
        },
        error: (err) => {
          console.error('Failed to update status', err);
          todo.status = originalStatus; // revert on error
        }
      });
  }



  
}
