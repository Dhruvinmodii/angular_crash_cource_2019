import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todosarray!: Todo[];

  constructor(private todoservice: TodoService) {}

  ngOnInit() {
    this.todoservice.getTodos().subscribe((todos) => {
      this.todosarray = todos;
    });
  }

  deleteTodo(todo: Todo) {
    // Remove From UI
    this.todosarray = this.todosarray.filter((t) => t.id !== todo.id);
    // Remove from server
    this.todoservice.deleteTodo(todo).subscribe();
  }

  addTodo(todo: Todo) {
    this.todoservice.addTodo(todo).subscribe((todo) => {
      this.todosarray.push(todo);
    });
  }
}
