import { Component } from '@angular/core';
import { appConfig } from 'app/core/config/app.config';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrl: './project-info.component.scss'
})
export class ProjectInfoComponent {

  constructor()
  {
  }


  goToAppPage(): void {
    window.open('https://github.com/IsraelSantosVieira/gestao-repositorios-app', '_blank');
  }

  goToApiPage(): void {
    window.open('https://github.com/IsraelSantosVieira/gestao-repositorios-api', '_blank');
  }

  goToLinkedInPage(): void {
    window.open('https://www.linkedin.com/in/israel-vieira-b957b4224', '_blank');
  }

  goToPrimePage(): void {
    window.open('https://primeng.org/', '_blank');
  }

  protected readonly appConfig = appConfig;
}
