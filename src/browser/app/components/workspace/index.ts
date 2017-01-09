import { Component, OnInit } from '@angular/core';
import { DCWindowLarge } from "../../helpers/window-large.dc";
import {Connection} from "../../helpers/connection";

const html = require('./view.html');
const css = require('./styles.scss');

@Component({
    template: html
})
export class WorkspaceComponent extends DCWindowLarge{

    databases: Array<string>;

    constructor(connection: Connection){

        super();

        this.databases = connection.databases;

    }

    ngOnInit(){

        super.ngOnInit();

        if(this.databases.length == 0){

        }

    }

}