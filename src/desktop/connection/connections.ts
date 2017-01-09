const fs = require('fs');
const path = require('path');

export class Connections{

    file: string = path.join(__dirname, 'connections.json');

    loadRecentConnections(){
        return this.loadConnections().splice(0, 6);
    }

    saveConnections(data){
        fs.writeFileSync(this.file, JSON.stringify(data));
    }

    loadConnections(){

        fs.openSync(this.file, 'r+');
        let connections = JSON.parse(fs.readFileSync(this.file));

        if(Array.isArray(connections)){
            connections.reverse();
        }

        return connections;

    }

    upConnectionToRecentTop(id){

        let connections = this.loadConnections().reverse();

        for(let index = 0; index < connections.length; index++){
            if(connections[index]._id == id){
                connections.push(connections[index]);
                connections.splice(index, 1);
                break;
            }
        }

        this.saveConnections(connections);

    }

}