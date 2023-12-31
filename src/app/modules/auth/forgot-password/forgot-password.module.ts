import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AuthForgotPasswordComponent } from 'app/modules/auth/forgot-password/forgot-password.component';
import { authForgotPasswordRoutes } from 'app/modules/auth/forgot-password/forgot-password.routing';
import { MessagesModule } from "primeng/messages";
import { InputTextModule } from "primeng/inputtext";
import { MessageModule } from "primeng/message";

@NgModule({
    declarations: [
        AuthForgotPasswordComponent
    ],
    imports: [
        RouterModule.forChild(authForgotPasswordRoutes),
        SharedModule,
        MessagesModule,
        InputTextModule,
        MessageModule
    ]
})
export class AuthForgotPasswordModule
{
}
