import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {baseAnimations} from "../../../shared/modules/animations";
import { FormBuilder, NgForm, UntypedFormGroup, Validators } from "@angular/forms";
import { catchError, Observable, of } from "rxjs";
import ExceptionUtils from "../../../shared/utils/exception-utils";
import { AuthService } from "../../../core/services/auth/auth.service";
import { LogService } from "../../../core/services/debug/log.service";
import { Router } from "@angular/router";
import { LogLevel } from "../../../core/models/enums/log-level.types";
import MessageConstants from "../../../shared/constants/message.constants";
import UrlUtils from "../../../shared/utils/url-utils";

@Component({
    selector     : 'auth-confirmation-required',
    templateUrl  : './confirmation-required.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : baseAnimations
})
export class AuthConfirmationRequiredComponent implements OnInit
{
    @ViewChild('confirmNgForm') confirmNgForm!: NgForm;

    confirmForm!: UntypedFormGroup;
    submitted: boolean = false;
    remainingResendTime: boolean = false;

    /**
     * Constructor
     */
    constructor(
      private _formBuilder: FormBuilder,
      private _authService: AuthService,
      private _logService: LogService,
      private _router: Router
    )
    {
    }

    ngOnInit(): void
    {
      this.confirmForm = this._formBuilder.group({
        code: ['',
          [
            Validators.required,
            Validators.minLength(4)]
          ],
      });
    }

    resendActivationCode(): void
    {
        if ( this.remainingResendTime )
        {
            this._logService.createMessage({
                logLevel: LogLevel.Warn,
                summary: MessageConstants.WARNING.resendCodeDelay.summary,
                message: MessageConstants.WARNING.resendCodeDelay.detail
            });

            return;
        }

        this.remainingResendTime = true;

        const email = this._authService.userEmail;
        this._authService.resendActivationCode(email)
            .pipe(catchError(error => ExceptionUtils.createServerException(error, this._logService)))
            .subscribe(_ => {
                this._logService.createMessage({
                    logLevel: LogLevel.Success,
                    summary: MessageConstants.SUCCESS.resendCode.summary,
                    message: MessageConstants.SUCCESS.resendCode.detail
                });
            });

        setTimeout((): void =>
        {
            this.remainingResendTime = false;
        }, 5000);
    }

    confirmActivationCode = (): Observable<any> =>
    {
        this.submitted = true;

        if ( this.confirmForm.invalid )
        {
            return of(null);
        }

        this.confirmForm.disable();

        const data: any = {
            ...this.confirmForm.value,
            email: this._authService.userEmail
        }

        return this._authService.activeAccount(data).pipe(
            catchError(error => ExceptionUtils.createServerException(error, this._logService))
        );
    }

    onReceiveActiveSuccess = (response: any): void =>
    {
        this.submitted = false;

        if ( UrlUtils.validateServerResponse(response) )
        {
            this._logService.createMessage({
                logLevel: LogLevel.Success,
                summary: MessageConstants.SUCCESS.accountActivated.summary,
                message: MessageConstants.SUCCESS.accountActivated.detail
            });

            this._router.navigateByUrl('landing-page');
        }
        else
        {
            this._logService.createMessage({
                logLevel: LogLevel.Error,
                summary: MessageConstants.ERROR.accountActivated.summary,
                message: MessageConstants.ERROR.accountActivated.detail
            });

            this.confirmForm.enable();
            this.confirmNgForm.resetForm();
        }
    }

    protected onReceiveActiveError = (error: any): void =>
    {
        this.confirmForm.enable();
        this.confirmNgForm.resetForm();
        this._logService.debug(error);
        this.submitted = false;
    }
}
