import * as _ from "lodash";
import {TodoInterface} from "../interfaces/todo.interface";

export class TodoForUpdateDto implements TodoInterface {
  public id!: string;
  public name!: string;
  public isChecked!: boolean

  constructor(fields: any) {
    _.assign(this, fields);
  }

  toJSON() {
    return {
      [this.id]: <TodoInterface>{
        name: this.name,
        isChecked: this.isChecked,
      }
    }
  }
}
