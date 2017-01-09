import { DCWindow } from "./window.dc";

export class DCWindowSmall extends DCWindow{

    ngOnInit(){
        this.window.setSize(800, 600, true);
        this.window.center();
        this.window.setResizable(false);
        this.window.setFullScreenable(false);
    }

}