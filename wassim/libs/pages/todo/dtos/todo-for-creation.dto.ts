export class TodoForCreationDto {
  public name;

  constructor(todo: any) {
    this.name = todo.name;
  }
}
