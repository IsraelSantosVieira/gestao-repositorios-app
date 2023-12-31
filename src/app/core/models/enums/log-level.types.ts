import { environment } from 'environments/environment';

export enum LogLevel
{
  Debug = 0,
  Info = 1,
  Warn = 2,
  Error = 3,
  Critical = 4,
  Success = 5
}

export const insideLogLevel = (level: LogLevel): boolean =>
{
  return level >= environment.logLevel;
}
