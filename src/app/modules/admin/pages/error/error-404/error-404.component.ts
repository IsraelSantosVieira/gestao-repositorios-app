import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from "../../../../../core/services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
    selector       : 'error-404',
    templateUrl    : './error-404.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Error404Component
{
    /**
     * Constructor
     */
    constructor(
      private _authService: AuthService,
      private _router: Router
    )
    {
    }

    logout(): void
    {
      this._authService.signOut().subscribe(
        _ => this._router.navigate(['']));
    }
}
