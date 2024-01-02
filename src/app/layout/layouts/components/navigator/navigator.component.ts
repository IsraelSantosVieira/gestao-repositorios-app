import { Component, OnInit } from '@angular/core';
import { NavigatorItem } from "../../../../core/models/misc/navigator-item.types";
import { appConfig } from "../../../../core/config/app.config";
import { MenuItem, MenuItemCommandEvent } from "primeng/api";
import { UserService } from "../../../../core/services/auth/user.service";
import { User } from "../../../../core/models/user/user.types";
import { LogService } from "../../../../core/services/debug/log.service";
import { LoadingBarService } from "../../../../core/services/misc/loading-bar.service";
import { AuthService } from "../../../../core/services/auth/auth.service";

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrl: './navigator.component.scss'
})
export class NavigatorComponent implements OnInit
{

  topItems: MenuItem[] | undefined;
  items: MenuItem[] | undefined;
  profileItems: MenuItem[] | undefined;

  protected _appConfig = appConfig;
  protected readonly _loadingService = LoadingBarService;

  private _isMasterUser: boolean = false;

  constructor(
      private _userService: UserService,
      private _logService: LogService,
      private _authService: AuthService
  )
  {
  }

  ngOnInit(): void
  {
    this._userService.user$.subscribe((user: User): void =>
    {
      this._isMasterUser = user.master;
      this._logService.debug('Master: ' + this._isMasterUser);
    });

    const navigator = this;
    this.profileItems = [
      {
        label: 'Meu perfil'
      },
      {
        label: 'Minha coleção',
      },
      {
        label: 'Sair',
        command(_: MenuItemCommandEvent): void
        {
          navigator.signOut();
        }
      }
    ]

    this.topItems = [
      {
        label: 'Sobre'
      },
      {
        label: 'Contato'
      },
      {
        label: 'Política de Privacidade'
      }
    ]

    this.items = [
      {
        label: 'Início',
        icon: 'pi pi-home',
      },
      {
        separator: true
      },
      {
        label: 'Recursos Educacionais',
      },
      {
        label: 'Minha Coleção',
      },
      {
        label: 'Painel Administrativo',
        icon: 'pi pi-bookmark',
        visible: this._isMasterUser
      },
      {
        label: 'Configurações',
        icon: 'pi pi-cog',
        visible: this._isMasterUser,
        items: [
          {
            label: 'Servidor'
          },
          {
            label: 'Usuários'
          },
          {
            label: 'Parâmetros'
          }
        ]
      }
    ];
  }

  getAvatarImage(): string
  {
    return 'assets/images/misc/avatar.png';
  }

  signOut(): void
  {
    this._authService.signOut();
    location.reload();
  }
}
