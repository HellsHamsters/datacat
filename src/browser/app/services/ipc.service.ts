const ipc = require('electron').ipcRenderer;

const IPC_EVENT__CONNECTIONS_LOAD        = 'connections-load';
const IPC_EVENT__CONNECTIONS_LOADED      = 'connections-loaded';

const IPC_EVENT__CONNECTION_CONNECT     = 'connection-connect';
const IPC_EVENT__CONNECTION_CONNECTED   = 'connection-connected';

const IPC_EVENT__CONNECTION_CREATE      = 'connection-create';
const IPC_EVENT__CONNECTION_CREATED     = 'connection-created';

export class IPCService{

    send(name, attr){
        return ipc.send(name, attr);
    }

    on(name){

        return new Promise<any>((resolve, reject) => {

            ipc.on(name, (event, arg) => {

                // Parse raw JSON string to object

                let response = JSON.parse(arg);

                // Check that fatal exists

                if(response.fatal){
                    // @TODO need create common handler for fatal errors
                    return reject(response);
                }

                return resolve(response);

            });

        });

    }

    /** App Methods **/

    load_recent_connections(): Promise<any> {
        this.send(IPC_EVENT__CONNECTIONS_LOAD, 'recent');
        return this.on(IPC_EVENT__CONNECTIONS_LOADED);
    }

    conn_create(options: Object): Promise<any> {
        this.send(IPC_EVENT__CONNECTION_CREATE, options);
        return this.on(IPC_EVENT__CONNECTION_CREATED);
    }

    conn_connect(id: string): Promise<any> {
        this.send(IPC_EVENT__CONNECTION_CONNECT, id);
        return this.on(IPC_EVENT__CONNECTION_CONNECTED);
    }

}