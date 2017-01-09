import { Component, OnInit } from '@angular/core';
import { DCWindowLarge } from "../../helpers/window-large.dc";
import { DCCurrentConnection } from "../../helpers/currentConnection.dc";

let html = require('./view.html');
let css = require('./styles.scss');

@Component({
    template: html
})
export class WorkspaceComponent extends DCWindowLarge{

    databases: Array<string>;

    constructor(currentConnection: DCCurrentConnection){

        super();

        this.databases = currentConnection.databases;

    }

    ngOnInit(){

        super.ngOnInit();

        if(this.databases.length == 0){

        }

    }

}