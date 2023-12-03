import { Component, Input, OnDestroy } from '@angular/core';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-async-button',
  templateUrl: './async-button.component.html',
  styleUrl: './async-button.component.scss'
})
export class AsyncButtonComponent implements OnDestroy {

  @Input() label: string = 'Button';
  @Input() size: 'small' | 'large' | undefined;
  @Input() severity: string = 'primary';

  @Input() asyncCall: (() => Observable<any>) | undefined;
  @Input() onReceiveData: ((data: any) => void) | undefined;
  @Input() onReceiveError: ((error: any) => void) | undefined;

  @Input() loadingIcon: string | undefined;
  @Input() rounded: boolean = false;
  @Input() textMode: boolean = false;
  @Input() raisedMode: boolean = false;
  @Input() outlineMode: boolean = false;
  @Input() disabled: boolean = false;

  protected _loading: boolean = false;

  private _destroy$ = new Subject<void>();

  protected _onClick(): void
  {
    if( this.asyncCall )
    {
      this._loading = true;

      this.asyncCall()
        .pipe(
          takeUntil(this._destroy$),
          finalize((): void => { this._loading = false; } ))
        .subscribe((response): void =>
        {
          if ( this.onReceiveData )
          {
            this.onReceiveData(response);
          }
        }, (error): void => {
          if ( this.onReceiveError )
          {
            this.onReceiveError(error);
          }
        });
    }
    else
    {
      throw new Error('asyncCall is not defined');
    }
  }

  ngOnDestroy(): void
  {
    if ( this._destroy$ )
    {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }

}
