import * as _ from "lodash";

export class TodoBo {
  public id = null;
  public name = '';

  constructor(fields: any) {
    _.assign(this, fields);
  }
}
