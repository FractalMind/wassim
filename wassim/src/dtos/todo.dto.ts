import * as _ from "lodash";
import {TodoInterface} from "../interfaces/todo.interface";


export class TodoDto {
  public id = null;
  public name = '';

  constructor(fields?: TodoInterface) {
      _.assign( this, fields);
  }
}
