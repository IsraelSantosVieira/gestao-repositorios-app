import { ApiRoute } from 'app/core/models/enums/api-route.types';
import { LogLevel } from 'app/core/models/enums/log-level.types';

export const environment = {
  production: false,
  localStore: {
    accessToken: 'com.repositorio-app.access-token',
    refreshToken: 'com.repositorio-app.refresh-token',
    userEmail: 'com.repositorio-app.user-email',
    userPass: 'com.repositorio-app.user-pass',
    rememberMe: 'com.repositorio-app.remember-me'
  },
  apiUrl: 'http://localhost:5000',
  apiVersion: 'v1',
  logLevel: LogLevel.Debug,

  get identityV1Resource(): string {
    return `${this['apiUrl']}/identity/${this.apiVersion}`;
  },

  get clientV1Resource(): string {
    return `${this['apiUrl']}/client/${this.apiVersion}`;
  },

  getEnvironmentUri(endpoint: string, route: ApiRoute = ApiRoute.Client): string {
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
