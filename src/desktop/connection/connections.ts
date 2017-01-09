const fs    = require('fs');
const path  = require('path');

export class Connections {

    private file: string = path.join(__dirname, 'connections.json');

    public loadRecentConnections() {

        let connections = this.loadConnections();

        if (connections.length > 6) {
            connections.splice(0, 6);
        }

        return connections;

    }

    public saveConnections(data) {
        fs.writeFileSync(this.file, JSON.stringify(data));
    }

    public loadConnections() {

        fs.openSync(this.file, 'r+');
        let connections = JSON.parse(fs.readFileSync(this.file).toString());

        if (Array.isArray(connections)) {
            connections.reverse();
        }

        return connections;

    }

    public upConnectionToRecentTop(id) {

        let connections = this.loadConnections();

        if(connections.length > 0) {

            connections.reverse();

            for (let index = 0; index < connections.length; index++) {
                if (connections[index]._id === id) {
                    connections.push(connections[index]);
                    connections.splice(index, 1);
                    break;
                }
            }

            this.saveConnections(connections);

        }

    }

}
