import { NgModule } from '@angular/core';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    MessagesModule,
    ToastModule
  ],
  exports: [
    MessagesModule,
    ToastModule
  ]
})
export class PrimeMessagesModule
{
}
