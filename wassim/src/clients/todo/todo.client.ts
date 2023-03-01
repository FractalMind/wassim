import {FirebaseClientBase} from "../base/firebase.client.base";
import {Injectable} from "@angular/core";
import {TodoBo} from "../../app/todo/bos/todo.bo";
import {Observable} from "rxjs";
import {TodoItemModel} from "./models/todo-item.model";

@Injectable({
  providedIn: 'root'
})
export class TodoClient extends FirebaseClientBase {
  public createTodo(todoBo: TodoBo): Observable<any> {
    return this.post('/todos.json', todoBo);
  }

  public getTodoList(): Observable<Array<TodoItemModel>> {
    return this.get('/todos.json');
  }
}
