import { NgModule } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  imports: [
    FileUploadModule
  ],
  exports: [
    FileUploadModule
  ]
})
export class PrimeFileModule
{
}
