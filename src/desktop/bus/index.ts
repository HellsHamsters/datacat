import { Connections } from '../connection/connections';
import { Connection } from '../connection/connection';
const ipc = require('electron').ipcMain;

export class Bus {

    constructor() {
        this.init();
    }

    public init() {

        /* Loading Connections **/

        ipc.on('connections-load', (event, arg) => {

            let connections;

            switch (arg) {
                case 'recent': connections = new Connections().loadRecentConnections(); break;
                case 'saved':  connections = new Connections().loadConnections(); break;
                default: break;
            }

            event.sender.send('connections-loaded', JSON.stringify(connections));

        });

        /* Create new connection **/

        ipc.on('connection-create', (event, arg) => {

            let connection = new Connection(null, arg.type, arg.host, arg.port, arg.user, arg.pass, arg.name);

            connection.create().then((data) => {
                event.sender.send('connection-created', JSON.stringify(data));
            }, (err) => {
                event.sender.send('connection-created', JSON.stringify(err));
            });

        });

        /* @TODO Remove saved connection **/

        /* Connect to database **/

        ipc.on('connection-connect', (event, connectionId) => {

            let connection = new Connection(connectionId);

            connection.connect().then((data) => {
                event.sender.send('connection-connected', JSON.stringify(data));
            }, (err) => {
                event.sender.send('connection-connected', JSON.stringify(err));
            });

        });

    }

}
