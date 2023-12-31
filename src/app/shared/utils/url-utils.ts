class UrlUtils
{
  static validateServerResponse(response: any): boolean
  {
    if ( response == null )
    {
      return false;
    }

    if ( typeof response === 'object' )
    {
      return response.success;
    }

    return true;
  }

  static getURLParameters(url: string): Record<string, string>
  {
    const params: Record<string, string> = {};
    new URL(url).searchParams.forEach((value, key) =>
    {
      params[key] = value;
    });

    return params;
  }
}

export default UrlUtils;
