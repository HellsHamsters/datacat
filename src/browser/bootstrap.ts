import './vendor';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app';
let css = require('./bootstrap.scss');

platformBrowserDynamic().bootstrapModule(AppModule);