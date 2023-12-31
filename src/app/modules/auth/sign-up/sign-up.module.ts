import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AuthSignUpComponent } from 'app/modules/auth/sign-up/sign-up.component';
import { authSignupRoutes } from 'app/modules/auth/sign-up/sign-up.routing';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PrimeOverlayModule } from 'app/shared/prime/prime-overlay.module';
import { MessagesModule } from 'primeng/messages';
import { PrimeFormsModule } from 'app/shared/prime/prime-forms.module';

@NgModule({
    declarations: [
        AuthSignUpComponent
    ],
  imports: [
    RouterModule.forChild(authSignupRoutes),
    SharedModule,
    CheckboxModule,
    InputTextModule,
    MessageModule,
    PrimeOverlayModule,
    PrimeFormsModule,
    MessagesModule
  ]
})
export class AuthSignUpModule
{
}
