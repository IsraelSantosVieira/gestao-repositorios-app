import { NgModule } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';

@NgModule({
  imports: [
    DragDropModule
  ],
  exports: [
    DragDropModule
  ]
})
export class PrimeDragDropModule
{
}
