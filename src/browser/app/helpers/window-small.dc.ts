import { DCWindow } from './window.dc';
import { OnInit } from '@angular/core';

export class DCWindowSmall extends DCWindow implements OnInit {

    public ngOnInit() {
        this.window.setSize(800, 600, true);
        this.window.setResizable(false);
        this.window.setFullScreenable(false);
        this.window.setMaximizable(false);
        this.window.center();
    }

}
