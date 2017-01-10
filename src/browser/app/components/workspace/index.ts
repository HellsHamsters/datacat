import { Component, NgZone, OnInit } from '@angular/core';
import { DCWindowLarge } from '../../helpers/window-large.dc';
import { Collection } from '../../helpers/collection';

const html  = require('./view.html');
const css   = require('./styles.scss');

@Component({
    template: html
})
export class WorkspaceComponent extends DCWindowLarge implements OnInit {

    public tabs = [
        {title: 'localhost', label: 'data', active: true},
    ];

    public dbs = [
        {title: 'information_schema'},
        {title: 'performance_schema'},
        {title: 'mysql'},
        {title: 'sys'},
        {title: 'laravel', tables: [
            {title: 'users'},
            {title: 'billing'},
            {title: 'orders'},
            {title: 'tickets'},
            {title: 'settings'},
            {title: 'pages'},
        ]},
    ];

    constructor(
        private zone: NgZone
    ) {

        super();

    }

    public ngOnInit() {

        super.ngOnInit();

    }

    public setActiveTab(i) {

        this.zone.run(() => {

            // Disabling active tabs

            this.tabs.filter((value) => {
                return value.active;
            }).map((obj) => {
                obj.active = false;
            });

            // Activate current tab

            this.tabs[i].active = true;

        });

    }

    public closeTab(i) {

        this.zone.run(() => {

            this.tabs.splice(i, 1);

        });

    }

    public openNewTab() {

        this.zone.run(() => {

            let hosts   = new Collection('localhost', '192.168.1.1', '127.0.0.1');
            let users   = new Collection('root', 'laravel', 'user1817');
            let ports   = new Collection(3306, 3307, 22, 1100);
            let labels  = new Collection('data', 'schema', 'sql', 'users');

            this.tabs.filter((value) => {
                return value.active;
            }).map((obj) => {
                obj.active = false;
            });

            let element = {
                title: users.random() + '@' + hosts.random() + ':' + ports.random(),
                label: labels.random(),
                active: true
            };

            this.tabs.push(element);

        });

    }

}