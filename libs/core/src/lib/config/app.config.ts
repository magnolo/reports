import { Layout } from '@twentythree/layout/layout.types';


// Types
export type Scheme = 'auto' | 'dark' | 'light';
export type Theme = 'default' | string;

export interface Filter {
  type: 'top' | 'quantile';
  value: number;
}

/**
 * AppConfig interface. Update this interface to strictly type your config
 * object.
 */
export interface AppConfig
{
    layout: Layout;
    scheme: Scheme;
    theme: Theme;
    selectedCountry?: string,
    selectedRegion?: string,
    filters: Filter[]
}

/**
 * Default configuration for the entire application. This object is used by
 * FuseConfigService to set the default configuration.
 *
 * If you need to store global configuration for your app, you can use this
 * object to set the defaults. To access, update and reset the config, use
 * FuseConfigService and its methods.
 */
export const appConfig: AppConfig = {
    layout: 'dense',
    scheme: 'dark',
    theme : 'default',
    selectedCountry: undefined,
    selectedRegion: undefined,
    filters: []
};
