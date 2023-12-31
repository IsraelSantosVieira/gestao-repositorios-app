import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeFullModule } from 'app/shared/prime/prime-full.module';
import { AsyncButtonComponent } from 'app/shared/components/async-button/async-button.component';
import { ProjectInfoComponent } from 'app/shared/components/project-info/project-info.component';
import { CreatePasswordComponent } from 'app/shared/components/create-password/create-password.component';

@NgModule({
    declarations: [
      AsyncButtonComponent,
      ProjectInfoComponent,
      CreatePasswordComponent
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

      AsyncButtonComponent,
      ProjectInfoComponent,
      CreatePasswordComponent
    ]
})
export class SharedModule
{
}
