import { app } from 'electron';
import { system } from './system';

const path  = require('path');
const fs    = require('fs');

class Files {

    public mkdir(path) {

        try {
            fs.mkdir(path);
        } catch (e) {
            if (e.errno === 34) {
                this.mkdir(path.dirname(path));
                this.mkdir(path);
            }
        }

    }

    public write(file, content) {
        fs.writeFile(file, content, 'utf8', (err) => {
            return;
        });
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
    public getUserHomePath(): string {
        return app.getPath('home');
    }

    /**
     *
     * Final destinations for configs and cache.
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
    public getConfigsPath(usage: string): string {

        if (system.isDarwin()) {

            return path.resolve(
                this.getUserHomePath(),
                'Library',
                ((usage === 'Configs') ? 'Preferences' : usage),
                'DataCat'
            );

        } else if (system.isLinux() || system.isWin()) {
            return path.resolve(this.getUserHomePath(), '.datacat', usage.toLowerCase());
        }

    }

}

let files = new Files();
export { files };

