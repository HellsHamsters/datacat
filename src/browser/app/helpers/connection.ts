import { Injectable } from '@angular/core';
import {IPCService} from "../services/ipc.service";
import {NotificationService} from "../services/notification.service";

@Injectable()
export class Connection{

    private _id:string;

    public name:string;
    public type:string = 'mysql';

    public host:string;
    public port:number;
    public user:string;
    public pass:string;

    public databases:Array<any>;

    /**
     * @param options
     * @example
     * new Connection().set({
     *     type: 'mysql',
     *     host: 'localhost',
     *     port: 3306,
     *     user: 'root',
     *     pass: 123456
     * });
     */
    set(options: Object = null){

        for(let key of Object.keys(options)){
            this[key] = options[key];
        }

        return this;

    }

    getId(){
        return this._id;
    }

    getCredentials(){
        return {
            name: this.name,
            type: this.type,
            host: this.host,
            port: this.port,
            user: this.user,
            pass: this.pass
        }
    }

    create(): Promise<any> {

        return new Promise<any>((resolve, reject) => {

            new IPCService().conn_create(this.getCredentials())
                .then((response) => {
                    this.set(response).connect().then((response) => {
                        return resolve(response);
                    });
                });

        });

    }

    update(){

        if(this.getId() == null){
            throw 'update() need valid _id for run';
        }

    }

    remove(){

        if(this.getId() == null){
            throw 'remove() need valid _id for run';
        }

    }

    connect(): Promise<any> {

        return new Promise<any>((resolve, reject) => {

            if(this.getId() == null){
                return reject('connect() need valid _id for run');
            }

            new IPCService().conn_connect(this.getId())
                .then((data) => {

                    this.databases = data;
                    new NotificationService().send(this.name, 'Connected');

                    return resolve(data);

                })
                .catch((reason) => {
                    alert('Connection to ' + this.getCredentials().host + ':' + this.getCredentials().port + ' is failed!\n\n' + reason.code + '\n' + reason.errno);
                    return reject(reason);
                });

        });

    }

}