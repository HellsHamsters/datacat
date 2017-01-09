const remote = require('electron').remote;
import { OnInit } from '@angular/core';

export class DCWindow implements OnInit {

    public window: any;

    constructor() {
        this.window = this.getWindow();
    }

    public ngOnInit() {
        //
    }

    public getWindow() {
        return remote.getCurrentWindow();
    }

}
