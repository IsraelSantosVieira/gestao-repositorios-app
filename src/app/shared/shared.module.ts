import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeFullModule } from 'app/shared/prime/prime-full.module';
import { AsyncButtonComponent } from 'app/shared/components/async-button/async-button.component';

@NgModule({
    declarations: [
      AsyncButtonComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      PrimeFullModule
    ],
    exports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,

      AsyncButtonComponent
    ]
})
export class SharedModule
{
}
