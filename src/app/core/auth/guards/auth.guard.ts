import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/core/services/auth/auth.service';
import { of, switchMap } from 'rxjs';
import { UserService } from "../../services/auth/user.service";

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) =>
{
    const router: Router = inject(Router);
    const userService: UserService = inject(UserService);

    // Check the authentication status
    return inject(AuthService).check().pipe(
        switchMap((authenticated) =>
        {
            // If the user is not authenticated...
            if ( !authenticated )
            {
                // Redirect to the sign-in page with a redirectUrl param
                const redirectURL = state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;
                let urlTree = router.parseUrl(`sign-in?${redirectURL}`);

                if ( userService.user?.pendingRegisterInformation )
                {
                    urlTree = router.parseUrl('confirmation-required');
                }

                return of(urlTree);
            }

            // Allow the access
            return of(true);
        }),
    );
};
