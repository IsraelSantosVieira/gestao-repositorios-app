import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { catchError, Observable, of } from 'rxjs';
import { AuthService } from 'app/core/services/auth/auth.service';
import {baseAnimations} from "../../../shared/modules/animations";
import { Message } from "primeng/api";
import ExceptionUtils from "../../../shared/utils/exception-utils";
import { LogService } from "../../../core/services/debug/log.service";
import { LogLevel } from "../../../core/models/enums/log-level.types";
import MessageConstants from "../../../shared/constants/message.constants";
import { Router } from "@angular/router";
import UrlUtils from "../../../shared/utils/url-utils";

@Component({
    selector     : 'auth-forgot-password',
    templateUrl  : './forgot-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : baseAnimations
})
export class AuthForgotPasswordComponent implements OnInit
{
    @ViewChild('forgotPasswordNgForm') forgotPasswordNgForm!: NgForm;

    forgotPasswordForm!: UntypedFormGroup;
    messages: Message[] = [];
    submitted: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _logService: LogService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Send the reset link
     */
    sendResetLink = (): Observable<any> =>
    {
        if ( this.forgotPasswordForm.invalid )
        {
            return of(null);
        }

        this.forgotPasswordForm.disable();
        this.messages = [];
        const email = this.forgotPasswordForm.get('email')?.value;

        return this._authService.forgotPassword(email).pipe(
            catchError(error => ExceptionUtils.createServerException(error, this._logService))
        );
    }

    onReceiveResult = (response: any): void =>
    {
        this.submitted = false;

        if ( UrlUtils.validateServerResponse(response) )
        {
            this._logService.createMessage({
                logLevel: LogLevel.Success,
                summary: MessageConstants.SUCCESS.passwordRecovery.summary,
                message: MessageConstants.SUCCESS.passwordRecovery.detail
            });

            this._router.navigateByUrl('/reset-password');
        }
        else
        {
            this._logService.createMessage({
                logLevel: LogLevel.Error,
                summary: MessageConstants.ERROR.passwordRecovery.summary,
                message: MessageConstants.ERROR.passwordRecovery.detail
            });

            this.forgotPasswordForm.enable();
            this.forgotPasswordNgForm.resetForm();
        }
    }

    onReceiveError = (error: any): void =>
    {
        this.forgotPasswordForm.enable();
        this.forgotPasswordNgForm.resetForm();
        this._logService.debug(error);
        this.submitted = false;
    }
}
