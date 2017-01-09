import { Bus } from "./bus";
import { Application } from "./application";

/** Handler for crashes */

process.on('uncaughtException', function (err) {

    // @TODO need implement

    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);

    const dialog = require('electron').dialog;

    dialog.showMessageBox({
        type: 'error',
        message: 'A JavaScript error occurred in the main process',
        detail: err.stack,
        buttons: ['OK'],
    });

    process.exit(1);

});

/** Initialize IPC bus **/

new Bus();

/** Initialize Application */

new Application();