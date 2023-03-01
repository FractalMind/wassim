import {TodoItemModel} from "../../../clients/todo/models/todo-item.model";

export class TodoItemBo {
  public id: string;
  public name: string;

  constructor(todoItemModel: TodoItemModel) {
    this.id = todoItemModel.id;
    this.name = todoItemModel.name;
  }
}
