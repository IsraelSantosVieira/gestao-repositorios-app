import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthUtils} from 'app/core/auth/auth.utils';
import {UserService} from 'app/core/services/auth/user.service';
import {catchError, Observable, of, switchMap, throwError} from 'rxjs';
import {environment} from "../../../../environments/environment";
import {AuthenticateResult} from "../../models/authenticate-result.types";
import {Response} from "app/core/models/response.types";
import {ApiRoute} from "app/core/models/enums/api-route.types";

@Injectable({providedIn: 'root'})
export class AuthService
{
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem(environment.localStore.accessToken, token);
    }

    set refreshToken(token: string)
    {
        localStorage.setItem(environment.localStore.refreshToken, token);
    }

    set userEmail(email: string)
    {
        localStorage.setItem(environment.localStore.userEmail, email);
    }

    get accessToken(): string
    {
        return localStorage.getItem(environment.localStore.accessToken) ?? '';
    }

    get refreshToken(): string
    {
        return localStorage.getItem(environment.localStore.refreshToken) ?? '';
    }

    get userEmail(): string
    {
        return localStorage.getItem(environment.localStore.userEmail) ?? '';
    }

    get apiUrl(): string
    {
        return environment.apiUrl;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }

        const data = {
            ...credentials,
            grantType: 'password',
            scope: 'Website'
        }

        const uri = environment.getEnvironmentUri('/connect/auth', ApiRoute.Identity);

        return this._httpClient.post(uri, data).pipe(
            // @ts-ignore
            switchMap((response: Response<AuthenticateResult>) =>
            {
                // Store the access token in the local storage
                this.accessToken = response.data.accessToken;
                this.refreshToken = response.data.refreshToken;
                this.userEmail = response.data.user?.email;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.data.user;

                // Return a new observable with the response
                return of(response);
            }),
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {
        const data = {
            email: this.userEmail,
            grantType: 'refresh_token',
            scope: 'Website',
            refreshToken: this.refreshToken
        }

        // Sign in using the token
        const uri = environment.getEnvironmentUri('/connect/auth', ApiRoute.Identity);
        return this._httpClient.post(uri, data).pipe(
            // @ts-ignore
            catchError(() =>
                of(false),
            ),
            switchMap((response: Response<AuthenticateResult>) =>
            {
                // Replace the access token with the new one if it's available on
                // the response object.
                //
                // This is an added optional step for better security. Once you sign
                // in using the token, you should generate a new one on the server
                // side and attach it to the response object. Then the following
                // piece of code can replace the token with the refreshed one.
                if ( !response.success )
                {
                     return of(false);
                }

                if ( response.data.accessToken )
                {
                    this.accessToken = response.data.accessToken;
                    this.refreshToken = response.data.refreshToken;
                    this.userEmail = response.data.user?.email;
                }

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.data.user;

                // Return true
                return of(true);
            }),
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token and refresh token from the local storage
        localStorage.removeItem(environment.localStore.accessToken);
        localStorage.removeItem(environment.localStore.refreshToken);
        localStorage.removeItem(environment.localStore.userEmail);

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists, and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}