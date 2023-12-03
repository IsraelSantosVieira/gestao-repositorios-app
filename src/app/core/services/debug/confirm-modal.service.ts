import { Injectable } from '@angular/core';

/**
 * Componente de modal de confirmação genérico, para ser
 * usado deve vincular os callbacks de acordo com o método:
 * this.callback.bind(this);
 */
@Injectable({
  providedIn: 'root',
})
export class ConfirmModalService {

  private onRejectCallback!: Function;
  private onConfirmCallback!: Function;

  setOnRejectCallback(callback: Function): void {
    this.onRejectCallback = callback;
  }

  setOnConfirmCallback(callback: Function): void {
    this.onConfirmCallback = callback;
  }

  getOnRejectCallback(): Function {
    return this.onRejectCallback;
  }

  getOnConfirmCallback(): Function {
    return this.onConfirmCallback;
  }
}
