import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Todo } from '../todo';
import { TodoService } from '../todo-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [RouterModule],
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
    // Optimistic update for immediate UI feedback
    const originalStatus = todo.status;
    todo.status = !todo.status;

    this.todoService.updateTodoStatus(todo.id, todo.status)
      .subscribe({
        next: (res) => console.log('Status updated', res),
        error: (err) => {
          console.error('Failed to update status', err);
          todo.status = originalStatus; // revert on error
        }
      });
  }

  
}
