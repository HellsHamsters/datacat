import { app, BrowserWindow } from 'electron';

const path  = require('path');
const url   = require('url');

export class Application{

    application: any = app;
    window: any;

    options = {
        window: {
            width: 800,
            height: 600,
            frame: false,
            titleBarStyle: 'hidden',
            resizable: false,
            show: false,
            fullscreenable: false,
        },
        url: url.format({
            pathname: path.join(__dirname, 'bootstrap.html'),
            protocol: 'file:',
            slashes: true
        })
    };

    constructor(){

        this.application.on('ready', this.OnReady.bind(this));
        this.application.on('activate', this.OnActivate.bind(this));
        this.application.on('window-all-closed', this.OnWindowAllClosed.bind(this));

    }

    initializeWindow(){

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

        this.window.webContents.on('crashed', function () {
            // @TODO need implement
        });

        this.window.webContents.on('unresponsive', function () {
            // @TODO need implement
        });

    }

    quit(){
        this.application.quit();
    }

    isDarwin(){
        return process.platform === 'darwin';
    }

    isWindows(){
        return process.platform === 'win32';
    }

    isLinux(){
        return process.platform === 'linux';
    }

    OnWindowAllClosed(){
        if(!this.isDarwin()){
            this.quit();
        }
    }

    OnActivate(){
        if(this.window === null){
            this.initializeWindow();
        }
    }

    OnReady(){
        this.initializeWindow();
    }

}