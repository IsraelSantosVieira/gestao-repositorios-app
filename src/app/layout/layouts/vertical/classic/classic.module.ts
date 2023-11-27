import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ClassicLayoutComponent } from 'app/layout/layouts/vertical/classic/classic.component';

@NgModule({
    declarations: [
        ClassicLayoutComponent
    ],
    imports     : [
        HttpClientModule,
        RouterModule,
        SharedModule
    ],
    exports     : [
        ClassicLayoutComponent
    ]
})
export class ClassicLayoutModule
{
}
