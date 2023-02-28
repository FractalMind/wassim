import {Component, ElementRef, ViewChild} from '@angular/core';
import {TodoDto} from "../../dtos/todo.dto";
import {TodoService} from "../../services/todo.service";
import {BehaviorSubject, Observable} from "rxjs";
import {startWith, takeLast, tap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss']
})
export class TodoPage {

  @ViewChild('listTodoButton') listTodoButton: ElementRef | undefined;

  public todoList = [];
  public todoList$: Observable<TodoDto[]> | undefined;

  constructor(
    private todoService: TodoService,
    private _snackBar: MatSnackBar,
  ) {
      this.listTodo();
  }

  createTodo() {
    this.todoService.post( new TodoDto( {
      name: 'caca',
    })).pipe(
      tap( todoList => { this._snackBar.open('Todo created', undefined, { duration: 2000})}),
      tap( todoList => { this.listTodo() }),
    ).subscribe();
  }

  listTodo() {
    this.todoList$ = this.todoService.list().pipe(
      tap( todoList => { this._snackBar.open('Todos loaded', undefined, { duration: 2000})}),
    );
  }

}
