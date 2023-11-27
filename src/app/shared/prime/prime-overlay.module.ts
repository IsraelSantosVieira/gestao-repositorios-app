import { NgModule } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SidebarModule } from 'primeng/sidebar';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  imports: [
    ConfirmDialogModule,
    ConfirmPopupModule,
    DialogModule,
    DynamicDialogModule,
    OverlayPanelModule,
    SidebarModule,
    TooltipModule
  ],
  exports: [
    ConfirmDialogModule,
    ConfirmPopupModule,
    DialogModule,
    DynamicDialogModule,
    OverlayPanelModule,
    SidebarModule,
    TooltipModule
  ]
})
export class PrimeOverlayModule
{
}
