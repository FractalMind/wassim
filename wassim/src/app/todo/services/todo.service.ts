import {Observable, of, Subject} from "rxjs";
import {catchError, map, mergeMap, startWith, tap} from "rxjs/operators";
import {TodoClient} from "../../../clients/todo/todo.client";
import {Injectable} from "@angular/core";
import {TodoItemBo} from "../bos/todo-item.bo";
import {TodoItemModel} from "../../../clients/todo/models/todo-item.model";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public todoListSubject$ = new Subject();

  constructor(private todoClient: TodoClient) {
  }

  public createTodo(todo: any): Observable<any> {
    return this.todoClient.createTodo(todo)
      .pipe(
        tap( () => this.todoListSubject$.next( null ) ),
        catchError( (err: any) => {
          if(err.status === 409) { return 'My error 409' }
          return of(null);
        } )
      );
  }

  public getTodoList(): Observable<Array<TodoItemBo>> {
    return this.todoListSubject$
      .pipe(
        startWith( null ),
        mergeMap( () => {
          return  this.todoClient
            .getTodoList()
            .pipe(
              map((todoList: Array<TodoItemModel>) =>
                todoList.map(todoItemModel => new TodoItemBo(todoItemModel)))
            );
        }),
    )
  }

}

