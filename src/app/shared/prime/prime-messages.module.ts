import { NgModule } from '@angular/core';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';

@NgModule({
  imports: [
    MessagesModule,
    MessageModule,
    ToastModule
  ],
  exports: [
    MessagesModule,
    MessageModule,
    ToastModule
  ]
})
export class PrimeMessagesModule
{
}
