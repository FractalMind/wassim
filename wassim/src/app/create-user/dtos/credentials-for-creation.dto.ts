import * as _ from "lodash";

export class CredentialsForCreationDto {
  public email!: string;

  public password!: string;

  constructor(credentials?: {}) {
    _.assign(this, credentials);
  }
}
