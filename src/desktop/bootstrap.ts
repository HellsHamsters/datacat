import { Bus } from "./bus";
import { Application } from "./application";
// import { Raven } from "ravenjs";

/** Setup Raven **/

// Raven.config('').install();

/** Handler for crashes */

process.on('uncaughtException', function (err) {

    // @TODO need implement

    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);

    process.exit(1);

});

/** Initialize IPC bus **/

new Bus();

/** Initialize Application */

new Application();