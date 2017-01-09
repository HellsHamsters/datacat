export abstract class Adapter{

    connect(credentials): Promise<any> {
        return;
    }

    getDatabases(): Promise<any> {
        return;
    }

    getSchemas(): Promise<any> {
        return;
    }

    getTables(): Promise<any> {
        return;
    }

    getRows(): Promise<any> {
        return;
    }

    getColumns(): Promise<any> {
        return;
    }

}