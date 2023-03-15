import {TodoItemModel} from "../../../core/clients/todo/models/todo-item.model";

export class TodoTableItemBo {
  public id!: string;
  public name!: string;
  public isChecked = false;
  public isEditable = false;
  public isMouseOver = false;

  constructor(todoItemModel: TodoItemModel) {
    this.id! = todoItemModel.id;
    this.name! = todoItemModel.name;
    this.isChecked! = todoItemModel.isChecked;
    this.isEditable! = todoItemModel.isEditable;
    this.isMouseOver! = todoItemModel.isMouseOver;
  }
}
