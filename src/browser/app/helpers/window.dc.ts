const remote = require('electron').remote;
import { OnInit } from '@angular/core';

export class DCWindow implements OnInit{

    window: any;

    constructor(){
        this.window = this.getWindow();
    }

    ngOnInit(){}

    getWindow(){
        return remote.getCurrentWindow();
    }

}