import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabPage } from './lab.page';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterItemsPipe } from '../../core/pipes/filter-items.pipe';

@NgModule({
  declarations: [LabPage, FilterItemsPipe],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LabPage,
      },
    ]),
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [FilterItemsPipe],
})
export class LabModule {}
