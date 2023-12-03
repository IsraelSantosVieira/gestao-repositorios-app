import { Component } from '@angular/core';
import { ConfirmModalService } from 'app/core/services/debug/confirm-modal.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private _visible: boolean = false;

  constructor(
    private _confirmModalService: ConfirmModalService,
    private _messageService: MessageService
  )
  {
  }

  onReject(): void {
    const onRejectCallback = this._confirmModalService.getOnRejectCallback();
    if (onRejectCallback) {
      onRejectCallback();
    }

    this._visible = false;
    this._messageService.clear('confirm');
  }

  onConfirm(): void {
    const onConfirmCallback = this._confirmModalService.getOnConfirmCallback();
    if (onConfirmCallback) {
      onConfirmCallback();
    }

    this._visible = false;
    this._messageService.clear('confirm');
  }

  showConfirm(): void {
    if (!this._visible) {
      this._messageService.add(
        {
          key: 'confirm',
          sticky: true,
          severity: 'warn',
          summary: 'Você tem certeza?',
          detail: 'Confirme para prosseguir'
        });

      this._visible = true;
    }
  }

}
