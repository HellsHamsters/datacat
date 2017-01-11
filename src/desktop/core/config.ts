import { app } from 'electron';
import { files } from './files';

const path  = require('path');
const fs    = require('fs');

/**
 *
 * @usage
 * config.save(config.CONNRECENT, {});
 * config.load(config.CONNRECENT);
 *
 */
class Config {

    public static USAGE_CONFIGS   = 'Configs';
    public static USAGE_CACHE     = 'Cache';
    public static USAGE_LOGS      = 'Logs';

    public CONNRECENT = {file: 'connections-recent.json', type: Config.USAGE_CONFIGS, stub: JSON.stringify([])};
    public CONNSAVED  = {file: 'connections-saved.json', type: Config.USAGE_CONFIGS, stub: JSON.stringify([])};

    public save(key, data) {

        let folder  = files.getConfigsPath(key.type);
        let file    = path.resolve(folder, key.file);

        fs.stat(folder, (err, stats) => {
            if (err) { files.mkdir(folder); }
        });

        return files.write(file, JSON.stringify(data));

    }

    public load(key, asRaw = false) {

        let folder  = files.getConfigsPath(key.type);
        let file    = path.resolve(folder, key.file);

        if (!fs.existsSync(file)) {
            files.mkdir(folder);
            files.write(file, key.stub);
        }

        let loaded = fs.readFileSync(file);

        if (asRaw) {
            return loaded;
        }

        return JSON.parse(loaded);

    }

}

export let config = new Config();
