import { Component, NgZone } from '@angular/core';
import { DCWindowSmall } from "../../helpers/window-small.dc";
import { Router } from "@angular/router";
import { Connection } from "../../helpers/connection";
import {IPCService} from "../../services/ipc.service";

const select2     = require('select2');
const select2css  = require('select2/dist/css/select2.min.css');
const $           = require('jquery');
const html        = require('./view.html');
const css         = require('./styles.scss');

const logos = {
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

    private newConnection: Connection = new Connection();
    private connections: Array<any> = [];

    constructor(
        private zone: NgZone,
        private router: Router,
        private connection: Connection
    ) {

        super();

        new IPCService().load_recent_connections()
            .then((connections) => {
                this.connections = connections;
                console.log('Loaded recent connections: ', this.connections);
            })
            .catch((reason) => {
                // @TODO
            });

    }

    connectTo = (connection, i) => {

        this.zone.run(() => {

            console.log('Trying connect to:', connection);

            this.connections[i].status = 'wait';

            this.connection.set({
                _id: connection._id
            }).connect().then(() => {
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

        this.connection.set(this.newConnection).create().then(() => {
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