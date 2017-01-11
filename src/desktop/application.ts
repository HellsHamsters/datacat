import { app, BrowserWindow } from 'electron';

const path  = require('path');
const url   = require('url');

export class Application {

    public application: any = app;
    public window: BrowserWindow;

    public options = {

        window: {

            title: 'DataCat',
            width: 800,
            height: 600,
            frame: false,
            show: false,
            titleBarStyle: 'hidden',

            resizable: false,
            fullscreenable: false,
            movable: true,
            maximizable: false,
            minimizable: false,

            webPreferences: {

                devTools: (process.env.NODE_ENV === 'development'),
                textAreasAreResizable: false,
                webgl: false,
                defaultFontFamily: 'sans-serif',
                defaultEncoding: 'UTF-8',

                // Some says this options may try with High-DPI issues
                // 'direct-write': true
                // 'subpixel-font-scaling': true

            }

        },

        url: url.format({
            pathname: path.join(__dirname, 'bootstrap.html'),
            protocol: 'file:',
            slashes: true
        })

    };

    constructor() {

        this.application.on('ready', this.OnReady.bind(this));
        this.application.on('activate', this.OnActivate.bind(this));
        this.application.on('window-all-closed', this.OnWindowAllClosed.bind(this));

    }

    public initializeWindow() {

        require('electron-context-menu')({
            showInspectElement: (process.env.NODE_ENV === 'development'),
            prepend: (params, browserWindow) => [{
                label: 'DataCat',
            }]
        });

        this.window = new BrowserWindow(this.options.window);
        this.window.loadURL(this.options.url);

        this.window.webContents.openDevTools();

        this.window.once('ready-to-show', () => {

            this.window.center();
            this.window.show();
            this.window.focus();

        });

        this.window.on('closed', () => {
            this.window = null;
        });

        /** Handlers for errors and crashes */

        this.window.webContents.on('crashed', () => {
            // @TODO need implement
        });

        this.window.webContents.on('unresponsive', () => {
            // @TODO need implement
        });

    }

    public quit() {
        this.application.quit();
    }

    public isDarwin() {
        return process.platform === 'darwin';
    }

    public isWindows() {
        return process.platform === 'win32';
    }

    public isLinux() {
        return process.platform === 'linux';
    }

    public OnWindowAllClosed() {
        if (!this.isDarwin()) {
            this.quit();
        }
    }

    public OnActivate() {
        if (this.window === null) {
            this.initializeWindow();
        }
    }

    public OnReady() {
        this.initializeWindow();
    }

}
