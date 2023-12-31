import StringUtils from 'app/shared/utils/string-utils';
import { Observable, of } from 'rxjs';
import { LogService } from 'app/core/services/debug/log.service';
import { ServerError } from 'app/core/models/base/server-error.types';
import Linq from "./linq-utils";

class ExceptionUtils
{
  static createClientException(error: string): ServerError
  {
    return {
      success: false,
      errors: [error]
    };
  }

  static createServerException(errorObj: any, logService: LogService): Observable<any>
  {
    const error: ServerError = ExceptionUtils.getServerError(errorObj);
    logService.debug(Linq.firstOrDefault(error.errors) ?? StringUtils.empty());
    return of(error);
  }

  static getServerErrorMessage(errorObj: any, defaultMessage: string = ''): string
  {
    const invalidMessage: string = StringUtils.isNullOrEmpty(defaultMessage)
      ? StringUtils.empty()
      : defaultMessage;

    if (errorObj == null || errorObj?.errors == null)
    {
      return invalidMessage;
    }

    const errors: string[] = errorObj.errors;
    return Linq.firstOrDefault(errors) ?? invalidMessage;
  }

  static getServerError(errorObj: any): ServerError
  {
    if (errorObj?.error == null)
    {
      return errorObj;
    }

    return errorObj.error;
  }
}

export default ExceptionUtils;
