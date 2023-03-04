import * as _ from "lodash";

export class TodoForDeleteDto {
  public id!: string;

  constructor(fields: any) {
    _.assign(this, fields);
  }
}
