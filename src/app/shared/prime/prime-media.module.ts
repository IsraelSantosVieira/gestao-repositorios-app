import { NgModule } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';

@NgModule({
  imports: [
    CarouselModule,
    GalleriaModule,
    ImageModule
  ],
  exports: [
    CarouselModule,
    GalleriaModule,
    ImageModule
  ]
})
export class PrimeMediaModule
{
}
