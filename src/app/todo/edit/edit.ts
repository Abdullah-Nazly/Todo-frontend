import { Component } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../todo-service';
import { Todo } from '../todo';


@Component({
  selector: 'app-edit',
  imports: [RouterModule, FormsModule],
  templateUrl: './edit.html',
  styleUrl: './edit.scss'
})


export class Edit {

  id!: string;  
  title = '';
  creation_date = '';  // keep it, but readonly
  updated_date = '';  // will be set automatically
  status = false;
  error = '';

  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['todoId'];
    console.log(this.id);

    this.todoService.findTask(this.id).subscribe((todo: Todo) => {
      this.title = todo.title;
      this.creation_date = todo.creation_date;
      this.status = todo.status;
    });
  }

  submit() {
    if (!this.title) {
      this.error = 'Title is required.';
      return;
    }

    const input: Todo = {
      id: Number(this.id),               // ✅ use the route param
      title: this.title,
      creation_date: this.creation_date, // ✅ keep original date
      updated_date: new Date().toISOString().split('T')[0],
      status: this.status
    };

    this.todoService.updateTask(this.id, input).subscribe(() => {
      alert('Task updated successfully!');
      this.router.navigate(['/todos']);
    });
  }
}