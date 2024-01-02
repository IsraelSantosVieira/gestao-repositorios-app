import { Component } from '@angular/core';
import { appConfig } from 'app/core/config/app.config';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrl: './project-info.component.scss'
})
export class ProjectInfoComponent {

  protected readonly appConfig = appConfig;

  constructor()
  {
  }

}
