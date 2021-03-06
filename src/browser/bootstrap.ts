import './vendor';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app';
import './bootstrap.scss';

/** Initialize Application */

if (process.env.NODE_ENV !== 'development') {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
