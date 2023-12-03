import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { LogLevel } from 'app/core/models/enums/log-level.types';
import { MessageService } from 'primeng/api';
import MessageConstants from 'app/shared/constants/message.constants';

export interface LogMessage
{
  logLevel: LogLevel;
  message: string;
  summary?: string;
  exception?: string;
}

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
        summary: MessageConstants.ERROR_MESSAGES.client.summary,
        message: MessageConstants.ERROR_MESSAGES.client.detail,
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
        summary: summary,
        detail: message
      });
  }

  critical(message: string, summary: string = '', exception: string = ''): void
  {
    this._messageService.add(
      {
        severity: 'error',
        summary: summary,
        detail: message
      });

    if ( this.consoleLogIsEnabled )
    {
      console.error(`[Critical]: ${exception}`);
    }
  }

  error(message: string, summary: string = '', exception: string = ''): void
  {
    this._messageService.add(
      {
        severity: 'error',
        summary: summary,
        detail: message
      });

    if ( this.consoleLogIsEnabled )
    {
      console.error(`[Error]: ${exception}`);
    }
  }

  warn(message: string, summary: string = '', exception: string = ''): void
  {
    this._messageService.add(
      {
        severity: 'warn',
        summary: summary,
        detail: message
      });

    if ( this.consoleLogIsEnabled )
    {
      console.warn(`[Warning]: ${exception}`);
    }
  }

  info(message: string, summary: string = '', exception: string = ''): void
  {
    this._messageService.add(
      {
        severity: 'info',
        summary: summary,
        detail: message
      });

    if ( this.consoleLogIsEnabled )
    {
      console.log(`[Info]: ${exception}`);
    }
  }

  debug(exception: string): void
  {
    this._messageService.add(
      {
        severity: 'warn',
        summary: 'DEBUG',
        detail: exception
      });

    if ( this.consoleLogIsEnabled )
    {
      console.log(`[Debug]: ${exception}`);
    }
  }
}
