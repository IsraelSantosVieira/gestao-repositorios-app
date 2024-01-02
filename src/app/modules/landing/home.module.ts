import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { LandingHomeComponent } from 'app/modules/landing/home.component';
import { landingHomeRoutes } from 'app/modules/landing/home.routing';
import { PrimePanelModule } from "../../shared/prime/prime-panel.module";
import { PrimeMediaModule } from "../../shared/prime/prime-media.module";
import { PrimeMiscModule } from "../../shared/prime/prime-misc.module";

@NgModule({
    declarations: [
        LandingHomeComponent
    ],
    imports: [
        RouterModule.forChild(landingHomeRoutes),
        SharedModule,
        PrimePanelModule,
        PrimeMediaModule,
        PrimeMiscModule
    ]
})
export class LandingHomeModule
{
}
