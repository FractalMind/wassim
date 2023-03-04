import {Observable, of, Subject} from "rxjs";
import {catchError, map, mergeMap, startWith, tap} from "rxjs/operators";
import {TodoClient} from "../../../clients/todo/todo.client";
import {Injectable} from "@angular/core";
import {TodoForUpdateDto} from "../dtos/todo-for-update.dto";
import {TodoForDeleteDto} from "../dtos/todo-for-delete.dto";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public todoListSubject$ = new Subject();

  constructor(private todoClient: TodoClient,
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

  public getTodoList(returnModelClass: any): Observable<Array<typeof returnModelClass>> {
    return this.todoListSubject$
      .pipe(
        startWith(null),
        mergeMap(() => {
          return this.todoClient
            .getTodoList()
            .pipe(
              map((todoList: Array<typeof returnModelClass>) =>
                todoList.map(todoItemModel => new returnModelClass(todoItemModel))),
            );
        }),
      )
  }

}

