import { NgModule } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';

@NgModule({
  imports: [
    CalendarModule,
    CheckboxModule,
    DropdownModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    MultiSelectModule,
    PasswordModule
  ],
  exports: [
    CalendarModule,
    CheckboxModule,
    DropdownModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    MultiSelectModule,
    PasswordModule
  ]
})
export class PrimeInputModule
{
}
