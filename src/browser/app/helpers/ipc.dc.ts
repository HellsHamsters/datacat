const ipc = require('electron').ipcRenderer;

export class DCIPC{

    static send(name, attr){
        return ipc.send(name, attr);
    }

    static on(name, callback){
        ipc.on(name, callback);
    }

}