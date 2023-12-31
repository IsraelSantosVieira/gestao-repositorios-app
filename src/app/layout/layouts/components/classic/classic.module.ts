import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ClassicLayoutComponent } from 'app/layout/layouts/components/classic/classic.component';
import { NavigatorComponent } from "../navigator/navigator.component";
import { LayoutModule } from "../../../layout.module";
import { PrimeMiscModule } from "../../../../shared/prime/prime-misc.module";

@NgModule({
    declarations: [
        ClassicLayoutComponent,
        NavigatorComponent
    ],
    imports: [
        HttpClientModule,
        RouterModule,
        SharedModule,
        PrimeMiscModule
    ],
    exports     : [
        ClassicLayoutComponent
    ]
})
export class ClassicLayoutModule
{
}
