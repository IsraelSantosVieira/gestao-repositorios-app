import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { baseAnimations } from 'app/shared/modules/animations';
import { AuthService } from 'app/core/services/auth/auth.service';
import { Message } from 'primeng/api';
import MessageConstants from 'app/shared/constants/message.constants';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'environments/environment';
import { LogService } from 'app/core/services/debug/log.service';
import StringUtils from 'app/shared/utils/string-utils';
import ExceptionUtils from 'app/shared/utils/exception-utils';
import { LogLevel } from 'app/core/models/enums/log-level.types';
import { User } from "../../../core/models/user/user.types";
import UrlUtils from "../../../shared/utils/url-utils";

@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : baseAnimations
})
export class AuthSignInComponent implements OnInit
{
  @ViewChild('signInNgForm') signInNgForm!: NgForm;

  signInForm!: UntypedFormGroup;
  signInMessages: Message[] = [];
  protected submitted: boolean = false;

  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
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
    this.submitted = false;
    const rememberMe = localStorage.getItem(environment.localStore.rememberMe);
    let fillEmail = 'admin@repositorio.com';
    let fillPassword = '123456';

    if ( environment.production )
    {
      fillEmail = StringUtils.empty();
      fillPassword = StringUtils.empty();
    }

    if ( StringUtils.stringToBool(rememberMe) )
    {
      fillEmail = localStorage.getItem(environment.localStore.userEmail) || StringUtils.empty();
      fillPassword = localStorage.getItem(environment.localStore.userPass) || StringUtils.empty();
    }

    this.signInForm = this._formBuilder.group({
      email: [fillEmail, [Validators.required, Validators.email]],
      password: [fillPassword, Validators.required],
      rememberMe: [StringUtils.stringToBool(rememberMe) || StringUtils.empty()]
    });
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign in
   */
  signIn = (): Observable<any> =>
  {
    this.submitted = true;

    if (this.signInForm.invalid)
    {
      return of(null);
    }

    this.setupRememberMe();
    this.signInForm.disable();
    this.signInMessages = [];

    return this._authService.signIn(this.signInForm.value).pipe(
      catchError(error => ExceptionUtils.createServerException(error, this._logService))
    );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Protected/Private methods
  // -----------------------------------------------------------------------------------------------------

  protected onReceiveAuthResult = (response: any): void =>
  {
    this.submitted = false;

    if ( UrlUtils.validateServerResponse(response) )
    {
      this._logService.createMessage({
        logLevel: LogLevel.Success,
        summary: MessageConstants.SUCCESS.loginSuccess.summary,
        message: MessageConstants.SUCCESS.loginSuccess.detail
      });

      let redirectURL = this._activatedRoute.snapshot
        .queryParamMap.get('redirectURL') || '/signed-in-redirect';

      const user: User = response?.data?.user;
      this._logService.debug(user);

      if (user?.pendingRegisterInformation)
      {
        redirectURL = '/confirmation-required';
      }

      this._logService.debug('Redirect: ' + redirectURL);
      this._router.navigateByUrl(redirectURL);
    }
    else
    {
      this.setupErrorMessage(response);
      this.signInForm.enable();
      this.signInNgForm.resetForm();
    }
  }

  protected onReceiveAuthError = (error: any): void =>
  {
    this.signInForm.enable();
    this.signInNgForm.resetForm();
    this._logService.debug(error);
    this.setupErrorMessage(error);
    this.submitted = false;
  }

  private setupErrorMessage = (error: any): void =>
  {
    let serverError: string = ExceptionUtils.getServerErrorMessage(error,
      MessageConstants.ERROR.loginFailed.detail);

    this.signInMessages = [
      {
        severity: 'error',
        summary: StringUtils.empty(),
        detail: serverError,
      }
    ]
  }

  private setupRememberMe(): void
  {
    const formValues = this.signInForm.value;

    if ( formValues['rememberMe'] )
    {
      localStorage.setItem(environment.localStore.rememberMe, formValues['rememberMe']);
      localStorage.setItem(environment.localStore.userEmail, formValues['email']);
      localStorage.setItem(environment.localStore.userPass, formValues['password']);
    }
    else
    {
      localStorage.removeItem(environment.localStore.rememberMe);
      localStorage.removeItem(environment.localStore.userEmail);
      localStorage.removeItem(environment.localStore.userPass);
    }
  }
}
