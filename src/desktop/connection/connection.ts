import { Connections } from "./connections";
import { Adapter } from "./adapters/adapter";
import { MysqlAdapter } from "./adapters/mysql";
import { PgsqlAdapter } from "./adapters/pgsql";
import { RedisAdapter } from "./adapters/redis";
import { ElasticsearchAdapter } from "./adapters/elasticsearch";

export class Connection{

    private _adapter: Adapter;

    constructor(

        private _id:string = null,
        public type:string = null,

        public host:string = null,
        public port:number = null,
        public user:string = null,
        public pass:string = null,

        public name:string = null

    ){

        /** If we have _id, then load other data by this id **/

        if(typeof(this.getId()) !== 'undefined'){
            this.loadById(this.getId());
        }

        /** I don't think so we really need something like that **/

        this.port = (this.port) ? this.port : 3306;
        this.name = (this.name != '') ? this.name : this.type + ' ' + this.user + '@' + this.host + ':' + this.port;

        /** Choose adapter for further requests to database */

        this._adapter = this.chooseAdapter();

    }

    loadById(id){

        for(let value of new Connections().loadConnections()){

            if(value._id == id){
                this._id = id;
                this.name = value.name;
                this.type = value.db.type;
                this.host = value.db.host;
                this.port = value.db.port;
                this.user = value.db.user;
                this.pass = value.db.pass;
                break;
            }

        }

        return this;

    }

    establish(): Promise<any> {

        return new Promise<any>((resolve, reject) => {

            this._adapter.connect(this.getCredentials()).then((data) => {

                /**
                 * If connection was be successful, then we should
                 * move connection up in Recent list.
                 */

                new Connections().upConnectionToRecentTop(this.getId());

                /** Response to client **/

                return resolve(data);

            }, (err) => {
                return reject(err);
            });

        });

    }

    chooseAdapter(): Adapter {
        switch(this.type){
            case 'mysql': return new MysqlAdapter();
            case 'pgsql': return new PgsqlAdapter();
            case 'redis': return new RedisAdapter();
            case 'elasticsearch': return new ElasticsearchAdapter();
        }
    }

    getId(){
        return this._id;
    }

    getCredentials(){
        return {
            type: this.type,
            host: this.host,
            port: this.port,
            user: this.user,
            pass: this.pass
        };
    }

    toJSON(){
        return this.getCredentials();
    }

    connect(): Promise<any>{

        return new Promise<any>((resolve, reject) => {

            this.establish().then(() => {

                this._adapter.getDatabases().then((databases) => {
                    return resolve(databases);
                }, (err) => {
                    return reject(err);
                });

            }, (err) => {
                return reject(err);
            });

        });

    }

    create(): Promise<any>{

        return new Promise<any>((resolve, reject) => {

            /**
             *
             * Check that connection available.
             * First of wall trying create connection.
             *
             * If it will be successfully,
             * then parse databases list.
             *
             * **/

            this.establish().then(() => {

                /** Connect successfully established, then ask about DBs */

                this._adapter.getDatabases().then((databases) => {

                    /**
                     *
                     * Server send us databases list.
                     *
                     * It means that we can save
                     * new connection to persistent storage.
                     *
                     * Also we'll send this collection to UI
                     * for a few UI transformations w/o
                     * additional IPC requests.
                     *
                     */

                    let connections = new Connections();
                    let list = connections.loadConnections();

                    list.push({

                        /**
                         *
                         * We set it to 'connected',
                         * because UI may ask actual status of connection.
                         *
                         */

                        _id: new Date().getTime(),

                        status: 'connected',

                        name: this.name,

                        db: {
                            type: this.type,
                            host: this.host,
                            port: this.port,
                            user: this.user,
                            pass: this.pass,
                        },
                        ssh: {
                            required: false,
                        },
                        cache: {
                            databases: databases
                        }

                    });

                    connections.saveConnections(list);

                    return resolve(databases);

                }, (err) => {

                    /** Final fault. It means that we can't save new connection **/

                    return reject(err);

                });

            }, (err) => {

                /** Not connected in any reasons */

                return resolve(err);

            });

        });

    }

}