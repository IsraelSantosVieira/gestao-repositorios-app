import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ClassicLayoutComponent } from 'app/layout/layouts/components/classic/classic.component';
import { NavigatorComponent } from "../navigator/navigator.component";
import { LayoutModule } from "../../../layout.module";
import { PrimeMiscModule } from "../../../../shared/prime/prime-misc.module";
import { PrimeMenuModule } from "../../../../shared/prime/prime-menu.module";
import { FooterComponent } from "../footer/footer.component";

@NgModule({
    declarations: [
        ClassicLayoutComponent,
        NavigatorComponent
    ],
    imports: [
        HttpClientModule,
        RouterModule,
        SharedModule,
        PrimeMiscModule,
        PrimeMenuModule,
        FooterComponent
    ],
    exports     : [
        ClassicLayoutComponent
    ]
})
export class ClassicLayoutModule
{
}
