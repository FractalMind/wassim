import {Component} from '@angular/core';
import {TodoService} from "./services/todo.service";
import {lastValueFrom, Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TodoItemBo} from "./bos/todo-item.bo";


@Component({
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss']
})
export class TodoPage {

  public todoList$: Observable<TodoItemBo[]> | undefined;

  public mytodo = {
    name: 'pipi',
  }

  constructor(private todoService: TodoService,
              private _snackBar: MatSnackBar) {
    this.listTodo();
  }

  public async createTodo() {
    try {
      //lastValueFrom() triggers the request
      await lastValueFrom(this.todoService.createTodo(this.mytodo));
      this._snackBar.open('Todo created', undefined, {duration: 2000})
    } catch (error) {
      this._snackBar.open('Todo Error', undefined, {duration: 2000})
    }
  }

  public listTodo() {
    this.todoList$ = this.todoService
      .getTodoList()
      .pipe(
        tap(todoList => {
          this._snackBar.open('Todos loaded', undefined, {duration: 2000})
        }),
      );
  }

}
