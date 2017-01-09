import { DCWindow } from './window.dc';
import { OnInit } from '@angular/core';

export class DCWindowLarge extends DCWindow implements OnInit {

    public ngOnInit() {
        this.window.setSize(1000, 700, true);
        this.window.center();
        this.window.setResizable(true);
        this.window.setFullScreenable(true);
    }

}
