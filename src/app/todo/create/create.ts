import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../todo-service';
import { Router } from '@angular/router';
import { Todo } from '../todo';

@Component({
  selector: 'app-create',
  imports: [RouterModule, FormsModule],
  templateUrl: './create.html',
  styleUrl: './create.scss'
})
export class Create {

  title = '';
  currentDate: string = '';
  updated_date = '';
  error = '';

  constructor(private todoService: TodoService, private route: Router) { }

  ngOnInit() {
    const today = new Date();
    // optional: display-friendly format in HTML if needed
    this.currentDate = today.toISOString().slice(0, 19).replace('T', ' ');
  }

  // helper method to format dates as MySQL TIMESTAMP
  private formatDateTimeForMySQL(date: Date): string {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }

  submit() {

    if (!this.title) {
      this.error = 'Title is required.';
      return;
    }

    const now = new Date();

    const input: Todo = {
      id: 0,
      title: this.title,
      creation_date: this.formatDateTimeForMySQL(now), // ✅ MySQL format
      status: false
    };

    this.todoService.CreateTask(input).subscribe(() => {
      alert('Task created successfully!');
      this.route.navigate(['/todos']);
    });
  }

}
