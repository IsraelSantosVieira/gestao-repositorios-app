import { LogLevel } from 'app/core/models/enums/log-level.types';

export interface LogMessage
{
  logLevel: LogLevel;
  message: string;
  summary?: string;
  exception?: string;
}
