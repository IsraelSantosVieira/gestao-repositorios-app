import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfig, appConfig } from "../../../../core/config/app.config";
import { PrimeMenuModule } from "../../../../shared/prime/prime-menu.module";
import { SharedModule } from "../../../../shared/shared.module";

@Component({
  selector: 'app-footer',
  standalone: true,
    imports: [CommonModule, PrimeMenuModule, SharedModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  protected _appConfig: AppConfig = appConfig;

}
