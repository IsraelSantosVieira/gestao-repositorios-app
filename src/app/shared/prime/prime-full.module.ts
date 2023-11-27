import { NgModule } from '@angular/core';
import { PrimeButtonsModule } from 'app/shared/prime/prime-buttons.module';
import { PrimeChartModule } from 'app/shared/prime/prime-chart.module';
import { PrimeDataModule } from 'app/shared/prime/prime-data.module';
import { PrimeDirectivesModule } from 'app/shared/prime/prime-directives.module';
import { PrimeDragDropModule } from 'app/shared/prime/prime-drag-drop.module';
import { PrimeFileModule } from 'app/shared/prime/prime-file.module';
import { PrimeFormsModule } from 'app/shared/prime/prime-forms.module';
import { PrimeMediaModule } from 'app/shared/prime/prime-media.module';
import { PrimeMenuModule } from 'app/shared/prime/prime-menu.module';
import { PrimeMessagesModule } from 'app/shared/prime/prime-messages.module';
import { PrimeMiscModule } from 'app/shared/prime/prime-misc.module';
import { PrimeOverlayModule } from 'app/shared/prime/prime-overlay.module';
import { PrimePanelModule } from 'app/shared/prime/prime-panel.module';
import { PrimeInputModule } from 'app/shared/prime/prime-input.module';

@NgModule({
  imports: [
    PrimeButtonsModule,
    PrimeChartModule,
    PrimeDataModule,
    PrimeDirectivesModule,
    PrimeDragDropModule,
    PrimeFileModule,
    PrimeFormsModule,
    PrimeMediaModule,
    PrimeMenuModule,
    PrimeMessagesModule,
    PrimeMiscModule,
    PrimeOverlayModule,
    PrimePanelModule,
    PrimeInputModule
  ],
  exports: [
    PrimeButtonsModule,
    PrimeChartModule,
    PrimeDataModule,
    PrimeDirectivesModule,
    PrimeDragDropModule,
    PrimeFileModule,
    PrimeFormsModule,
    PrimeMediaModule,
    PrimeMenuModule,
    PrimeMessagesModule,
    PrimeMiscModule,
    PrimeOverlayModule,
    PrimePanelModule,
    PrimeInputModule
  ]
})
export class PrimeFullModule
{
}
