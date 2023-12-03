import { Layout } from 'app/layout/layout.types';

export interface AppConfig
{
    layout: Layout;
    appName: string;
}

export const appConfig: AppConfig = {
  layout  : 'classic',
  appName : 'Repositorio App'
};
