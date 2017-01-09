import { Adapter } from "./adapter";
const mysql = require('mysql');

export class MysqlAdapter extends Adapter{

    private _descriptor;

    connect(credentials){

        return new Promise<any>((resolve, reject) => {

            if (typeof(this._descriptor) === 'undefined') {

                this._descriptor = mysql.createConnection({
                    host: credentials.host,
                    port: credentials.port,
                    user: credentials.user,
                    password: credentials.pass
                });

                this._descriptor.connect((err) => {

                    if(err){
                        return reject(err);
                    } else {
                        return resolve(this._descriptor);
                    }

                });

            }

        });

    }

    getDatabases(){

        return new Promise<any>((resolve, reject) => {

            this._descriptor.query('SHOW DATABASES', (err, results) => {

                if(err){
                    return reject(err);
                } else {
                    return resolve(results);
                }

            });

        });

    }

}