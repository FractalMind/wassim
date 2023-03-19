import {FirebaseClient} from '../base/firebase-client.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TodoItemModel} from './models/todo-item.model';
import {TodoForUpdateDto} from '../../../pages/todo/dtos/todo-for-update.dto';
import {TodoForDeleteDto} from '../../../pages/todo/dtos/todo-for-delete.dto';
import {TodoForCreationDto} from '../../../pages/todo/dtos/todo-for-creation.dto';

@Injectable({
  providedIn: 'root',
})
export class TodoClient {
  constructor(private firebaseClient: FirebaseClient) {
  }

  public createTodo(todoForCreationDto: TodoForCreationDto): Observable<any> {
    return this.firebaseClient.post('/todos.json', todoForCreationDto);
  }

  public updateTodo(todoForUpdateDto: TodoForUpdateDto): Observable<any> {
    return this.firebaseClient.patch('/todos.json', todoForUpdateDto);
  }

  public deleteTodo(todoForDeleteDto: TodoForDeleteDto): Observable<any> {
    return this.firebaseClient.delete(
      '/todos/' + todoForDeleteDto.id + '.json'
    );
  }

  public getTodoList(): Observable<Array<TodoItemModel>> {
    return this.firebaseClient.get('/todos.json');
  }
}
