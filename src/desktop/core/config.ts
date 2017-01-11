import { app } from 'electron';
import { system } from './system';

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

        let folder  = this.getPathToCatHouse(key.type);
        let file    = path.resolve(folder, key.file);

        if (!fs.existsSync(file)) {
            this.mkdirp(folder);
        }

        return this.write(file, JSON.stringify(data));

    }

    public load(key, asRaw = false) {

        let folder  = this.getPathToCatHouse(key.type);
        let file    = path.resolve(folder, key.file);

        if (!fs.existsSync(file)) {
            this.mkdirp(folder);
            this.write(file, key.stub);
        }

        fs.openSync(file, 'r+');
        let loaded = fs.readFileSync(file);

        if (asRaw) {
            return loaded;
        }

        return JSON.parse(loaded);

    }

    private mkdirp(path) {

        try {
            fs.mkdirSync(path);
        } catch (e) {
            if (e.errno === 34) {
                this.mkdirp(path.dirname(path));
                this.mkdirp(path);
            }
        }

    }

    private write(file, content) {
        return fs.writeFileSync(file, content, 'utf8');
    }

    /**
     *
     * Reference: http://electron.atom.io/docs/api/app/#appgetpathname
     *
     * Also we can do it as: process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
     * Or: (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
     *
     * @returns {string}
     */
    private getPathToUserHome(): string {
        return app.getPath('home');
    }

    /**
     *
     * Final destination for configs and cache.
     * Information about best approaches was collected from:
     *
     * - https://intellij-support.jetbrains.com/hc/en-us/articles/
     * 206544519-Directories-used-by-the-IDE-to-store-settings-caches-plugins-and-logs
     *
     * - https://developer.apple.com/library/content/documentation/General/Conceptual/
     * MOSXAppProgrammingGuide/AppRuntime/AppRuntime.html
     *
     * - https://developer.apple.com/library/content/documentation/FileManagement/Conceptual/
     * FileSystemProgrammingGuide/MacOSXDirectories/MacOSXDirectories.html
     *
     * @param {string} usage
     * @returns {string}
     */
    private getPathToCatHouse(usage: string): string {

        if (system.isDarwin()) {

            return path.resolve(
                this.getPathToUserHome(),
                'Library',
                ((usage === 'Configs') ? 'Preferences' : usage),
                'DataCat'
            );

        } else if (system.isLinux() || system.isWin()) {
            return path.resolve(this.getPathToUserHome(), '.datacat', usage.toLowerCase());
        }

        return '';

    }

}

export let config = new Config();
