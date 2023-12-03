import { ApiRoute } from 'app/core/models/enums/api-route.types';
import { LogLevel } from 'app/core/models/enums/log-level.types';

export const environment = {
  production: true,
  localStore: {
    accessToken: 'com.repositorio-app.access-token',
    refreshToken: 'com.repositorio-app.refresh-token',
    userEmail: 'com.repositorio-app.user-email',
    rememberMe: 'com.repositorio-app.remember-me'
  },
  apiUrl: 'https://api.repositorio-app.com.br',
  apiVersion: 'v1',
  logLevel: LogLevel.Error,

  get identityV1Resource(): string {
    return `${this['apiUrl']}/identity/${this.apiVersion}`;
  },

  get clientV1Resource(): string {
    return `${this['apiUrl']}/client/${this.apiVersion}`;
  },

  getEnvironmentUri(endpoint: string, route: ApiRoute): string {
    switch (route)
    {
        case ApiRoute.Identity:
            return this.identityV1Resource + endpoint;
        case ApiRoute.Client:
            return this.clientV1Resource + endpoint;
        default:
            return this.clientV1Resource + endpoint;
    }
  }
};
