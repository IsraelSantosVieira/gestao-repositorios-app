import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingBarService
{
  static isLoading: boolean = false;

  private _asyncCount: number = 0;
  private _timeoutSeconds: number = 20;
  private _timeoutId: any = null;

  show(async: boolean = true): void {
    if (!async) {
      LoadingBarService.isLoading = true;
      return;
    }

    this._asyncCount++;
    LoadingBarService.isLoading = true;

    if (this._timeoutId)
    {
      clearTimeout(this._timeoutId);
    }

    this._timeoutId = setTimeout(() =>
    {
      this.reset();
    }, this._timeoutSeconds * 1000);
  }

  hide(): void
  {
    this._asyncCount--;
    if (this._asyncCount <= 0)
    {
      this.reset();
    }
  }

  reset(): void
  {
    if (this._timeoutId)
    {
      clearTimeout(this._timeoutId);
    }

    LoadingBarService.isLoading = false;
    this._asyncCount = 0;
    this._timeoutId = null;
  }
}
