import {ApiRoute} from "../app/core/models/enums/api-route.types";

export const environment = {
  production: false,
  localStore: {
      accessToken: 'com.repositorio-app.access-token',
      refreshToken: 'com.repositorio-app.refresh-token',
      userEmail: 'com.repositorio-app.user-email'
  },
  apiUrl: 'http://localhost:5000',
  apiVersion: 'v1',
  useMockApi: true,

  get mockV1Resource(): string {
    return `${this['apiUrl']}/mock/${this.apiVersion}`;
  },

  get identityV1Resource(): string {
    return `${this['apiUrl']}/identity/${this.apiVersion}`;
  },

  get clientV1Resource(): string {
    return `${this['apiUrl']}/client/${this.apiVersion}`;
  },

  getEnvironmentUri(endpoint: string, route: ApiRoute = ApiRoute.Mock): string {
      if ( this.useMockApi )
      {
          return this.mockV1Resource + endpoint;
      }

      switch (route)
      {
          case ApiRoute.Mock:
              return this.mockV1Resource + endpoint;
          case ApiRoute.Identity:
              return this.identityV1Resource + endpoint;
          case ApiRoute.Client:
              return this.clientV1Resource + endpoint;
          default:
              return this.mockV1Resource + endpoint;
      }
  }
};
