import {TodoInterface} from "../interfaces/todo.interface";
import * as _ from "lodash";

export class TodoItemBo implements TodoInterface {
  public id!: string;
  public name!: string;
  public isChecked = false;
  public isEditable = false;
  public isMouseOver = false;

  constructor(todoItemModel: any) {
    _.assign(this, todoItemModel);
  }
}
