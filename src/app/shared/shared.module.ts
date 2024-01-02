import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeFullModule } from 'app/shared/prime/prime-full.module';
import { ProjectInfoComponent } from 'app/shared/components/project-info/project-info.component';
import { CreatePasswordComponent } from 'app/shared/components/create-password/create-password.component';
import { AsyncButtonComponent } from "./components/async-button/async-button.component";
import { SocialLinksComponent } from "./components/social-links/social-links.component";

@NgModule({
    declarations: [
      AsyncButtonComponent,
      ProjectInfoComponent,
      CreatePasswordComponent,
      SocialLinksComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PrimeFullModule,
    ],
    exports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,

      AsyncButtonComponent,
      ProjectInfoComponent,
      CreatePasswordComponent,
      SocialLinksComponent
    ]
})
export class SharedModule
{
}
