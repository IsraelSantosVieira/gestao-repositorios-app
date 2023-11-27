import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SpeedDialModule } from 'primeng/speeddial';

@NgModule({
  imports: [
    ButtonModule,
    SplitButtonModule,
    SpeedDialModule
  ],
  exports: [
    ButtonModule,
    SplitButtonModule,
    SpeedDialModule
  ]
})
export class PrimeButtonsModule
{
}
