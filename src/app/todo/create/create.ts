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
  error = '';

  constructor(private todoService: TodoService, private route:Router) { }

  ngOnInit() {
    // set today's date in yyyy-MM-dd format (HTML date input requires this)
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
  }


  submit() {

    if (!this.title) {
      this.error = 'Title is required.';
      return;
    }

    const input: Todo = {
      id: 0,
      title: this.title,
      creation_date: this.currentDate,
      status: false
    };

    this.todoService.CreateTask(input).subscribe(() => {
      alert('Task created successfully!');
      this.route.navigate(['/todos']);
    });
  }

}
