import { Component, ViewEncapsulation } from '@angular/core';
import {baseAnimations} from "../../../shared/modules/animations";

@Component({
    selector     : 'auth-confirmation-required',
    templateUrl  : './confirmation-required.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : baseAnimations
})
export class AuthConfirmationRequiredComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
