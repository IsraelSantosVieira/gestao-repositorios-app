import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AuthResetPasswordComponent } from 'app/modules/auth/reset-password/reset-password.component';
import { authResetPasswordRoutes } from 'app/modules/auth/reset-password/reset-password.routing';
import { InputTextModule } from "primeng/inputtext";
import { MessageModule } from "primeng/message";
import { PasswordModule } from "primeng/password";
import { InputMaskModule } from "primeng/inputmask";
import { MessagesModule } from "primeng/messages";

@NgModule({
    declarations: [
        AuthResetPasswordComponent
    ],
    imports: [
        RouterModule.forChild(authResetPasswordRoutes),
        SharedModule,
        InputTextModule,
        MessageModule,
        PasswordModule,
        InputMaskModule,
        MessagesModule
    ]
})
export class AuthResetPasswordModule
{
}
