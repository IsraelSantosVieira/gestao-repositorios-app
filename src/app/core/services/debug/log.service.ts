import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { LogLevel } from 'app/core/models/enums/log-level.types';
import { MessageService } from 'primeng/api';
import MessageConstants from 'app/shared/constants/message.constants';
import { LogMessage } from 'app/core/models/base/log-message.types';

/**
 * Log Service
 * Remember to use: create a toast component in target component to show toast messages
 * <p-toast></p-toast>
 */
@Injectable({
  providedIn: 'root'
})
export class LogService {

  private readonly consoleLogIsEnabled: boolean = false;
  private readonly currentLogLevel: LogLevel = LogLevel.Debug;
  private readonly messageLifetime: number = 4;

  constructor(private _messageService: MessageService)
  {
    this.currentLogLevel = environment.logLevel;
    this.consoleLogIsEnabled = !environment.production && this.currentLogLevel <= LogLevel.Info
  }

  createClientError(exception: string): void
  {
    this.createMessage(
      {
        logLevel: LogLevel.Error,
        summary: MessageConstants.ERROR.client.summary,
        message: MessageConstants.ERROR.client.detail,
        exception: exception
      });
  }

  createMessage(message: LogMessage): void
  {
    switch ( message.logLevel )
    {
      case LogLevel.Success:
        this.success(message.message, message.summary);
        break;
      case LogLevel.Critical:
        this.critical(message.message, message.summary, message.exception);
        break;
      case LogLevel.Error:
        this.error(message.message, message.summary, message.exception);
        break;
      case LogLevel.Warn:
        this.warn(message.message, message.summary, message.exception);
        break;
      case LogLevel.Info:
        this.info(message.message, message.summary, message.exception);
        break;
      case LogLevel.Debug:
        this.debug(message.exception || 'Not defined error');
        break;
      default:
        this.debug(message.exception || 'Not defined error');
        break;
    }
  }

  success(message: string, summary: string = ''): void
  {
    this._messageService.add(
      {
        severity: 'success',
        life: this.messageLifetime,
        summary: summary,
        detail: message
      });
  }

  critical(message: string, summary: string = '', exception: string = ''): void
  {
    this._messageService.add(
      {
        severity: 'error',
        life: this.messageLifetime,
        summary: summary,
        detail: message
      });

    if ( this.consoleLogIsEnabled )
    {
      this.systemLog('[Critical]:', exception);
    }
  }

  error(message: string, summary: string = '', exception: string = ''): void
  {
    this._messageService.add(
      {
        severity: 'error',
        life: this.messageLifetime,
        summary: summary,
        detail: message
      });

    if ( this.consoleLogIsEnabled )
    {
      this.systemLog('[Error]:', exception);
    }
  }

  warn(message: string, summary: string = '', exception: string = ''): void
  {
    this._messageService.add(
      {
        severity: 'warn',
        life: this.messageLifetime,
        summary: summary,
        detail: message
      });

    if ( this.consoleLogIsEnabled )
    {
      this.systemLog('[Warning]:', exception);
    }
  }

  info(message: string, summary: string = '', exception: string = ''): void
  {
    this._messageService.add(
      {
        severity: 'info',
        life: this.messageLifetime,
        summary: summary,
        detail: message
      });

    if ( this.consoleLogIsEnabled )
    {
      this.systemLog('[Info]:', exception);
    }
  }

  debug(exception: any): void
  {
    this._messageService.add(
      {
        severity: 'warn',
        life: this.messageLifetime,
        summary: 'DEBUG',
        detail: this.getObjectLog(exception)
      });

    if ( this.consoleLogIsEnabled )
    {
      this.systemLog('[Debug]:', exception);
    }
  }

  private systemLog(prefix: string, obj: any): void
  {
    console.log(prefix + ' ' + this.getObjectLog(obj));
  }

  private getObjectLog(obj: any): string
  {
    if (typeof obj === 'object' && obj != null)
    {
      return JSON.stringify(obj);
    }

    return obj;
  }
}
