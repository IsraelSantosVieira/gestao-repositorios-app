import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AuthConfirmationRequiredComponent } from 'app/modules/auth/confirmation-required/confirmation-required.component';
import { authConfirmationRequiredRoutes } from 'app/modules/auth/confirmation-required/confirmation-required.routing';
import { InputTextModule } from "primeng/inputtext";
import { MessageModule } from "primeng/message";
import { InputMaskModule } from "primeng/inputmask";
import { PrimeButtonsModule } from "../../../shared/prime/prime-buttons.module";

@NgModule({
    declarations: [
        AuthConfirmationRequiredComponent
    ],
    imports: [
        RouterModule.forChild(authConfirmationRequiredRoutes),
        SharedModule,
        InputTextModule,
        MessageModule,
        InputMaskModule,
        PrimeButtonsModule
    ]
})
export class AuthConfirmationRequiredModule
{
}
