import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import PasswordUtils from 'app/shared/utils/password-utils';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.scss'
})
export class CreatePasswordComponent
{
  @Input() formControlName: string = 'password';
  @Input() formGroup!: UntypedFormGroup;
  @Input() placeholder: string = 'Senha';

  protected readonly PasswordUtils = PasswordUtils;
}
