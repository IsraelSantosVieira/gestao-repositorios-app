import { NgModule } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DockModule } from 'primeng/dock';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MegaMenuModule } from 'primeng/megamenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TieredMenuModule } from 'primeng/tieredmenu';

@NgModule({
  imports: [
    BreadcrumbModule,
    ContextMenuModule,
    DockModule,
    MenuModule,
    MenubarModule,
    MegaMenuModule,
    PanelMenuModule,
    StepsModule,
    TabMenuModule,
    TieredMenuModule
  ],
  exports: [
    BreadcrumbModule,
    ContextMenuModule,
    DockModule,
    MenuModule,
    MenubarModule,
    MegaMenuModule,
    PanelMenuModule,
    StepsModule,
    TabMenuModule,
    TieredMenuModule
  ]
})
export class PrimeMenuModule
{
}
