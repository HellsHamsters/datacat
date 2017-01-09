import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule, PreloadAllModules} from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { DashboardComponent } from "./components/dashboard";
import { WorkspaceComponent } from "./components/workspace";
import { DCCurrentConnection } from "./helpers/currentConnection.dc";

@NgModule({

    bootstrap: [ AppComponent ],

    declarations: [
        AppComponent,
        DashboardComponent,
        WorkspaceComponent
    ],

    imports: [ // import Angular's modules
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
    ],

    providers: [
        DCCurrentConnection
    ]

})
export class AppModule{

    constructor(
        public appRef: ApplicationRef
    ) {}

}