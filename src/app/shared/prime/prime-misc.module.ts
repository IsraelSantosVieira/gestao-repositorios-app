import { NgModule } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { BlockUIModule } from 'primeng/blockui';
import { ChipsModule } from 'primeng/chips';
import { InplaceModule } from 'primeng/inplace';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { TerminalModule } from 'primeng/terminal';

@NgModule({
  imports: [
    AvatarModule,
    BadgeModule,
    BlockUIModule,
    ChipsModule,
    InplaceModule,
    ScrollTopModule,
    SkeletonModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    TagModule,
    TerminalModule
  ],
  exports: [
    AvatarModule,
    BadgeModule,
    BlockUIModule,
    ChipsModule,
    InplaceModule,
    ScrollTopModule,
    SkeletonModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    TagModule,
    TerminalModule
  ]
})
export class PrimeMiscModule
{
}
