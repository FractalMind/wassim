import * as _ from 'lodash';
import { TodoInterface } from '../interfaces/todo.interface';

export class TodoBo implements TodoInterface {
  public id!: string;
  public name!: string;
  public isChecked!: boolean;

  constructor(fields: any) {
    _.assign(this, fields);
  }
}
