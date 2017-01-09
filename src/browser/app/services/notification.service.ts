import { NotifySend, NotificationCenter, WindowsToaster, WindowsBalloon, Growl } from "node-notifier";
const os = require("os");

export class NotificationService{

    // @TODO need choose operating system

    private options = {
        title: 'DataCat',
        message: '',
        sound: false // Basso, Blow, Bottle, Frog, Funk, Glass, Hero, Morse, Ping, Pop, Purr, Sosumi, Submarine, Tink
    };

    send = (title, message) => {

        this.options.title = title;
        this.options.message = message;

        switch(os.type()) {
            case 'Linux':

                new NotifySend().notify(this.options, function(err, response){
                    console.log(err, response);
                });

                break;

            case 'Darwin':

                new NotificationCenter().notify(this.options, function(err, response){
                    console.log(err, response);
                });

                break;

            case 'Windows_NT':

                new WindowsToaster().notify(this.options, function(err, response){
                    console.log(err, response);
                });

                break;

        }

    }

}