import { NgModule } from '@angular/core';
import { LayoutComponent } from 'app/layout/layout.component';
import { SharedModule } from 'app/shared/shared.module';
import {EmptyLayoutModule} from "./layouts/empty/empty.module";
import { ClassicLayoutModule } from "./layouts/components/classic/classic.module";

const layoutModules = [
    // Empty
    EmptyLayoutModule,

    // Horizontal navigation
    ClassicLayoutModule,
];

@NgModule({
    declarations: [
        LayoutComponent,
    ],
    imports: [
        SharedModule,
        ...layoutModules,
    ],
    exports: [
        LayoutComponent,
        ...layoutModules,
    ]
})
export class LayoutModule
{
}
