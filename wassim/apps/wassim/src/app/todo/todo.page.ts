import {Component, OnInit} from '@angular/core';
import {TodoService} from './services/todo.service';
import {lastValueFrom} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TodoTableItemBo} from './bos/todo-table-item.bo';
import {MatDialog} from '@angular/material/dialog';
import {TodoModalComponent} from './todo-modal/todo.modal.component';

@Component({
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  public todoList$ = this.todoService.getTodoList();
  public displayedColumns: string[] = ['name'];

  constructor(
    private todoService: TodoService,
    private _snackBar: MatSnackBar,
    private matDialog: MatDialog
  ) {
  }

  ngOnInit() {
  }

  public openTodoModal(): void {
    const dialogRef = this.matDialog.open(TodoModalComponent, {
      width: '100%',
      maxWidth: '500px',
    });

    dialogRef.afterClosed().subscribe((todo: TodoTableItemBo) => {
      if (todo != null) {
        this.createTodo(todo);
      }
    });
  }

  public async createTodo(todo: TodoTableItemBo) {
    try {
      await lastValueFrom(this.todoService.createTodo(todo));
      this._snackBar.open('Todo created', undefined, {duration: 2000});
    } catch (error) {
      this._snackBar.open('Todo Error', undefined, {duration: 2000});
    }
  }

  public async checkTodo(todo: TodoTableItemBo) {
    todo.isChecked = !todo.isChecked;
    await this.editTodo(todo);
  }

  public async editTodo(todo: TodoTableItemBo) {
    todo.isEditable = false;
    await lastValueFrom(this.todoService.updateTodo(todo));
  }

  public async deleteTodo(todo: TodoTableItemBo) {
    await lastValueFrom(this.todoService.deleteTodo(todo));
  }
}
