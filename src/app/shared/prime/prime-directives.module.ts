import { NgModule } from '@angular/core';
import { DeferModule } from 'primeng/defer';
import { FocusTrapModule } from 'primeng/focustrap';
import { StyleClassModule } from 'primeng/styleclass';
import { RippleModule } from 'primeng/ripple';
import { AutoFocusModule } from 'primeng/autofocus';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@NgModule({
  imports: [
    DeferModule,
    FocusTrapModule,
    StyleClassModule,
    RippleModule,
    AutoFocusModule,
    AnimateOnScrollModule
  ],
  exports: [
    DeferModule,
    FocusTrapModule,
    StyleClassModule,
    RippleModule,
    AutoFocusModule,
    AnimateOnScrollModule
  ]
})
export class PrimeDirectivesModule
{
}
