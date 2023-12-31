import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AuthSignInComponent } from 'app/modules/auth/sign-in/sign-in.component';
import { authSignInRoutes } from 'app/modules/auth/sign-in/sign-in.routing';
import { PrimePanelModule } from 'app/shared/prime/prime-panel.module';
import { PrimeMessagesModule } from 'app/shared/prime/prime-messages.module';
import { PrimeFormsModule } from 'app/shared/prime/prime-forms.module';

@NgModule({
  declarations: [
    AuthSignInComponent
  ],
  imports: [
    RouterModule.forChild(authSignInRoutes),
    SharedModule,
    PrimePanelModule,
    PrimeMessagesModule,
    PrimeFormsModule
  ]
})
export class AuthSignInModule
{
}
