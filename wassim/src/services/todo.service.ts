import { Service } from "./base/base.service";
import {TodoDto} from "../dtos/todo.dto";
import {Observable} from "rxjs";
import {TodoInterface} from "../interfaces/todo.interface";
import {concatMap, map, tap} from "rxjs/operators";
import {TodoClient} from "../clients/todo.client";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class TodoService extends Service {
  constructor(
    private todoClient: TodoClient,
  ) {
    super();
  }

  public post(payload: TodoDto): Observable<TodoDto>  {
    return this.todoClient.post<TodoInterface, TodoDto>('/todos.json', payload).pipe(
      map( (responseInterface: TodoInterface) => new TodoDto(responseInterface) )
    );
  }

  public list(): Observable<TodoDto[]> {
    return this.todoClient.list<TodoInterface>('/todos.json').pipe(
      map( todoInterfaceList => todoInterfaceList.map(todoInterface => new TodoDto(todoInterface)) )
    );
  }

}
