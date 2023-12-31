import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { catchError, finalize, Observable, of } from 'rxjs';
import { AuthService } from 'app/core/services/auth/auth.service';
import {baseAnimations} from "../../../shared/modules/animations";
import {BaseValidators} from "../../../shared/modules/validators";
import { Message } from "primeng/api";
import ExceptionUtils from "../../../shared/utils/exception-utils";
import { LogService } from "../../../core/services/debug/log.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LogLevel } from "../../../core/models/enums/log-level.types";
import MessageConstants from "../../../shared/constants/message.constants";
import StringUtils from "../../../shared/utils/string-utils";
import UrlUtils from "../../../shared/utils/url-utils";

@Component({
    selector     : 'auth-reset-password',
    templateUrl  : './reset-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : baseAnimations
})
export class AuthResetPasswordComponent implements OnInit
{
    @ViewChild('resetPasswordNgForm') resetPasswordNgForm!: NgForm

    resetPasswordForm!: UntypedFormGroup;
    messages: Message[] = [];
    submitted: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _logService: LogService,
        private _router: Router,
        private _route: ActivatedRoute
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
        this.resetPasswordForm = this._formBuilder.group({
                code              : ['', Validators.required],
                email             : ['', Validators.required, Validators.email],
                newPassword       : ['', Validators.required, Validators.minLength(3)],
                passwordConfirm   : ['', Validators.required, Validators.minLength(3)]
            },
            {
                validators: BaseValidators.mustMatch('newPassword', 'passwordConfirm')
            }
        );

        this._route.params.subscribe((params: any): void =>
        {
            const email = params.email;
            if (!StringUtils.isNullOrEmpty(email))
            {
                this.resetPasswordForm.patchValue({
                    ...this.resetPasswordForm.value,
                    email
                })
            }
        })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Reset password
     */
    resetPassword = (): Observable<any> =>
    {
        this.submitted = true;

        if ( this.resetPasswordForm.invalid )
        {
            return of(null);
        }

        this.resetPasswordForm.disable();
        this.messages = [];

        return this._authService.resetPassword(this.resetPasswordForm.value).pipe(
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
                summary: MessageConstants.SUCCESS.passwordReset.summary,
                message: MessageConstants.SUCCESS.passwordReset.detail
            });

            this._router.navigateByUrl('/sign-in');
        }
        else
        {
            this.setupErrorMessage(response);
            this.resetPasswordForm.enable();
            this.resetPasswordNgForm.resetForm();
        }
    }

    onReceiveError = (error: any): void =>
    {
        this.resetPasswordForm.enable();
        this.resetPasswordNgForm.resetForm();
        this.submitted = false;
        this.setupErrorMessage(error);
    }

    private setupErrorMessage = (error: any): void =>
    {
        let serverError: string = ExceptionUtils.getServerErrorMessage(error,
            MessageConstants.ERROR.passwordReset.detail);

        this.messages = [
            {
                severity: 'error',
                summary: StringUtils.empty(),
                detail: serverError,
            }
        ]
    }
}
