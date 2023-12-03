import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { baseAnimations } from 'app/shared/modules/animations';
import { AuthService } from 'app/core/services/auth/auth.service';
import { Observable, of } from 'rxjs';
import { Message } from 'primeng/api';
import ExceptionUtils from 'app/shared/utils/exception-utils';
import MessageConstants from 'app/shared/constants/message.constants';
import StringUtils from 'app/shared/utils/string-utils';
import PasswordUtils from 'app/shared/utils/password-utils';
import PatternConstants from 'app/shared/constants/pattern.constants';
import { MessageInfo } from 'app/core/models/base/message-info.types';
import { LogService } from 'app/core/services/debug/log.service';
import { LogLevel } from 'app/core/models/enums/log-level.types';

@Component({
    selector     : 'auth-sign-up',
    templateUrl  : './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : baseAnimations
})
export class AuthSignUpComponent implements OnInit
{
  @ViewChild('signUpNgForm') signUpNgForm!: NgForm;

  signUpForm!: UntypedFormGroup;
  signUpMessages: Message[] = [];

  protected submitted: boolean = false;
  protected agreeTermsVisible: boolean = false;

  /**
   * Constructor
   */
  constructor(
    private _authService: AuthService,
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
    private _logService: LogService
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
    this.signUpForm = this._formBuilder.group(
      {
        email       : ['', [Validators.required, Validators.email]],
        password    : ['', Validators.required],
        firstName   : ['', Validators.required],
        lastName    : ['', Validators.required],
        phone       : ['', Validators.required, Validators.pattern(PatternConstants.Phone)],
        agreements  : ['', Validators.requiredTrue]
      });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign up
   */
  signUp = (): Observable<any> =>
  {
    this.submitted = true;

    if ( this.signUpForm.invalid )
    {
      return of(null);
    }

    const password = this.signUpForm.get('password')?.value;
    if ( !PasswordUtils.isValid(password) )
    {
      const message: MessageInfo = MessageConstants.ERROR.passwordIsWeak;
      return of(ExceptionUtils.createClientException(message.detail));
    }

    this.signUpForm.disable();
    return this._authService.signUp({
      ...this.signUpForm.value,
      phone: StringUtils.removePhoneFormatting(this.signUpForm.get('phone')?.value)
    });
  }

  onReceiveResult = (response: any): void =>
  {
    if ( response.success )
    {
      this._logService.createMessage({
        logLevel: LogLevel.Success,
        summary: MessageConstants.SUCCESS.accountCreated.summary,
        message: MessageConstants.SUCCESS.accountCreated.detail
      });

      // Navigate to the confirmation required page
      this.submitted = false;
      this._router.navigateByUrl('/confirmation-required');
    }
    else
    {
      this.setupErrorMessage(response);
      this.signUpForm.enable();
      this.signUpNgForm.resetForm();
    }
  }

  onReceiveError = (error: any): void =>
  {
    this.submitted = false;
    this.signUpForm.enable();
    this.signUpNgForm.resetForm();
    this.setupErrorMessage(error);
  }

  showAgreeTerms(): void
  {
    this.agreeTermsVisible = true;
  }

  private setupErrorMessage = (error: any): void =>
  {
    let serverError: string = ExceptionUtils.getServerErrorMessage(error,
      MessageConstants.ERROR.loginFailed.detail);

    this.signUpMessages = [
      {
        severity: 'error',
        summary: StringUtils.empty(),
        detail: serverError,
      }
    ]
  }

}
