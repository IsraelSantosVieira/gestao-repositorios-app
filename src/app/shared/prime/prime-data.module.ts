import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { ScrollerModule } from 'primeng/scroller';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { PaginatorModule } from 'primeng/paginator';
import { PickListModule } from 'primeng/picklist';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { TimelineModule } from 'primeng/timeline';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

@NgModule({
  imports: [
    TableModule,
    DataViewModule,
    ScrollerModule,
    OrderListModule,
    OrganizationChartModule,
    PaginatorModule,
    PickListModule,
    TreeModule,
    TreeTableModule,
    TimelineModule,
    VirtualScrollerModule
  ],
  exports: [
    TableModule,
    DataViewModule,
    ScrollerModule,
    OrderListModule,
    OrganizationChartModule,
    PaginatorModule,
    PickListModule,
    TreeModule,
    TreeTableModule,
    TimelineModule,
    VirtualScrollerModule
  ]
})
export class PrimeDataModule
{
}
