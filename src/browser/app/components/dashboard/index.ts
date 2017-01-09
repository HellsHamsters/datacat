import { Component, NgZone } from '@angular/core';
import { DCWindowSmall } from "../../helpers/window-small.dc";
import { DCIPC } from "../../helpers/ipc.dc";
import { Router } from "@angular/router";
import { DCCurrentConnection } from "../../helpers/currentConnection.dc";

let select2     = require('select2');
let select2css  = require('select2/dist/css/select2.min.css');
let $           = require('jquery');
let html        = require('./view.html');
let css         = require('./styles.scss');

let logos = {
    mysql: require('../../../assets/images/logotypes/mysql.png'),
    pgsql: require('../../../assets/images/logotypes/pgsql.png'),
    redis: require('../../../assets/images/logotypes/redis.png'),
    mongodb: require('../../../assets/images/logotypes/mongodb.png'),
    elasticsearch: require('../../../assets/images/logotypes/elasticsearch.png'),
};

console.log(logos.mysql);

@Component({
    selector: 'dashboard',
    template: html
})
export class DashboardComponent extends DCWindowSmall{

    private newConnection = new DCCurrentConnection();

    private connections: Array<any>;

    constructor(private zone: NgZone, private router: Router, private currentConnection: DCCurrentConnection) {

        super();

        DCIPC.send('connections-load', 'recent');
        DCIPC.on('connections-loaded', (event, arg) => {
            console.log('Loaded connections: ', arg);
            this.connections = arg;
        });

    }

    connectTo = (connection, i) => {

        console.log(connection);

        this.zone.run(() => {

            console.log('Trying connect to:', connection);

            this.connections[i].status = 'wait';

            this.currentConnection.set(connection.db).connect(connection._id).then(() => {
                this.router.navigate(['/workspace']);
            }, () => {
                this.connections[i].status = 'idle';
            });

        });

    };

    createNewConnection(){

        if(
            (typeof(this.newConnection.host) === 'undefined'||
            this.newConnection.host.length == 0) ||
            (typeof(this.newConnection.user) === 'undefined' ||
            this.newConnection.user.length == 0)
        ){
            alert('Host and User must be filled');
            return;
        }

        this.currentConnection.set(this.newConnection).create().then(() => {
            this.router.navigate(['/workspace']);
        }, (data) => {
            // @TODO
            console.log(data, 'rejected');
        });

    }

    openGithub(){

        let shell = require('electron').shell;
        shell.openExternal('https://github.com/HellsHamsters/datacat');

    }

    ngOnInit(){

        super.ngOnInit();

        this.zone.run(() => {

            $(document).ready(function() {

                function formatState (state) {
                    if (!state.id) { return state.text; }
                    return $(
                        '<span class="select2-image-logotype"><span class="img"><img style="height: 20px; margin-right: 10px;" src="' + logos[state.element.value.toLowerCase()] + '" class="logo" /></span> ' + state.text + '</span>'
                    );
                }

                $('.type').select2({
                    templateResult: formatState
                });

            });

        });

    }

}