import { config } from '../core/config';

export class Connections {

    public loadRecentConnections() {

        let connections = this.loadConnections();

        if (connections.length > 6) {
            connections.splice(0, 6);
        }

        return connections;

    }

    public loadConnections() {

        let connections = config.load(config.CONNRECENT);

        if (Array.isArray(connections)) {
            connections.reverse();
        }

        return connections;

    }

    public upConnectionToRecentTop(id) {

        let connections = this.loadConnections();

        if (connections.length > 0) {

            connections.reverse();

            for (let index = 0; index < connections.length; index++) {
                if (connections[index]._id === id) {
                    connections.push(connections[index]);
                    connections.splice(index, 1);
                    break;
                }
            }

            config.save(config.CONNRECENT, connections);

        }

    }

}
