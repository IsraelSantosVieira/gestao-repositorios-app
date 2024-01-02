import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss'
})
export class SocialLinksComponent
{
  @Input() small: boolean = false;
  @Input() onlyIcons: boolean = false;

  getSize(): "small" | "large" | undefined
  {
    if (this.small)
    {
      return 'small';
    }

    return undefined;
  }

  goToAppPage(): void
  {
    window.open('https://github.com/IsraelSantosVieira/gestao-repositorios-app', '_blank');
  }

  goToApiPage(): void
  {
    window.open('https://github.com/IsraelSantosVieira/gestao-repositorios-api', '_blank');
  }

  goToLinkedInPage(): void
  {
    window.open('https://www.linkedin.com/in/israel-vieira-b957b4224', '_blank');
  }

  goToPrimePage(): void
  {
    window.open('https://primeng.org/', '_blank');
  }

}
