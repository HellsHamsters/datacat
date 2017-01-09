const ipc = require('electron').ipcRenderer;

export class IPCService{

    send(name, attr){
        return ipc.send(name, attr);
    }

    on(name, callback){
        ipc.on(name, (event, arg) => {

            // Parse raw JSON string to object

            let response = JSON.parse(arg);

            // Check that fatal exists

            if(response.fatal){
                // @TODO need create common handler for fatal errors
            }

            // Fire event's callback

            callback(arg);

        });
    }

}