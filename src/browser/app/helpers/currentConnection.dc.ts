import { Injectable } from '@angular/core';
import {DCIPC} from "./ipc.dc";
import {DCNotification} from "./notification.dc";

@Injectable()
export class DCCurrentConnection{

    private _id:string;

    public name:string;
    public type:string = 'mysql';

    public host:string;
    public port:number;
    public user:string;
    public pass:string;

    public databases:Array<any>;

    set(connection, databases = []){

        this.name = connection.name;
        this.type = connection.type;
        this.host = connection.host;
        this.port = connection.port;
        this.user = connection.user;
        this.pass = connection.pass;
        this.databases = databases;

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

    connect(id){

        return new Promise<any>((resolve, reject) => {

            DCIPC.send('connection-connect', id);
            DCIPC.on('connection-connected', (event, arg) => {

                let response = JSON.parse(arg);

                if(typeof(response.code) !== 'undefined'){

                    alert('Connection to ' + this.getCredentials().host + ':' + this.getCredentials().port + ' is failed!\n\n' + response.code + '\n' + response.errno);

                    reject(response);

                } else {

                    this.set(this.getCredentials(), response);
                    new DCNotification().send(this.name, 'Connected');

                    resolve(response);

                }

            });

        });

    }

    create(){

        return new Promise<any>((resolve, reject) => {

            DCIPC.send('connection-create', this.getCredentials());
            DCIPC.on('connection-created', (event, arg) => {

                let response = JSON.parse(arg);

                if(response.fatal){

                    alert('Connection to ' + this.getCredentials().host + ':' + this.getCredentials().port + ' is failed!\n\n' + response.code + '\n' + response.errno);
                    reject(response);

                } else {

                    this.connect(this.getId()).then(() => {
                        resolve(true);
                    }, (data) => {
                        reject(data)
                    });

                }

            });

        });

    }

}