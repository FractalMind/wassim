import {Observable, of, Subject} from "rxjs";
import {catchError, map, mergeMap, startWith, tap} from "rxjs/operators";
import {TodoClient} from "../../../core/clients/todo/todo.client";
import {Injectable} from "@angular/core";
import {TodoForUpdateDto} from "../dtos/todo-for-update.dto";
import {TodoForDeleteDto} from "../dtos/todo-for-delete.dto";
import {TodoItemBo} from "../bos/todo-item.bo";
import {TodoItemModel} from "../../../core/clients/todo/models/todo-item.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public todoListSubject$ = new Subject();

  constructor(private todoClient: TodoClient,
              private _snackBar: MatSnackBar,
  ) {
  }

  public createTodo(todo: any): Observable<any> {
    return this.todoClient.createTodo(todo)
      .pipe(
        tap(() => this.todoListSubject$.next(null)),
        catchError((err: any) => {
          if (err.status === 409) {
            return 'My error 409'
          }
          return of(null);
        })
      );
  }

  public updateTodo(todo: any): Observable<any> {
    return this.todoClient.updateTodo(new TodoForUpdateDto(todo))
      .pipe(
        tap(() => this.todoListSubject$.next(null)),
      );
  }

  public deleteTodo(todo: any): Observable<any> {
    return this.todoClient.deleteTodo(new TodoForDeleteDto(todo))
      .pipe(
        tap(() => this.todoListSubject$.next(null)),
      );
  }

  public getTodoList(): Observable<Array<TodoItemBo>> {
    return this.todoListSubject$
      .pipe(
        startWith(null),
        mergeMap(() => {
          return this.todoClient.getTodoList()
        }),
        map((todoList: Array<TodoItemModel>) => {
          console.log('todoList', todoList);
          return todoList.map(todoItemModel => new TodoItemBo(todoItemModel));
        }),
        tap(() => {
          this._snackBar.open('Todos loaded', undefined, {duration: 2000})
        }),
      )
  }


}

