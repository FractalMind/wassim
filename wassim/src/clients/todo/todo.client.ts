import {FirebaseClientBase} from "../base/firebase.client.base";
import {Injectable} from "@angular/core";
import {TodoBo} from "../../app/todo/bos/todo.bo";
import {Observable} from "rxjs";
import {TodoItemModel} from "./models/todo-item.model";
import {TodoForUpdateDto} from "../../app/todo/dtos/todo-for-update.dto";
import {TodoForDeleteDto} from "../../app/todo/dtos/todo-for-delete.dto";

@Injectable({
  providedIn: 'root'
})
export class TodoClient extends FirebaseClientBase {
  public createTodo(todoBo: TodoBo): Observable<any> {
    return this.post('/todos.json', todoBo);
  }

  public updateTodo(todoForUpdateDto: TodoForUpdateDto): Observable<any> {
    return this.patch('/todos.json', todoForUpdateDto);
  }

  public deleteTodo(todoForDeleteDto: TodoForDeleteDto): Observable<any> {
    return this.delete('/todos/' + todoForDeleteDto.id + '.json',);
  }

  public getTodoList(): Observable<Array<TodoItemModel>> {
    return this.get('/todos.json');
  }
}
