import { DCWindow } from "./window.dc";

export class DCWindowLarge extends DCWindow{

    ngOnInit(){
        this.window.setSize(1000, 700, true);
        this.window.center();
        this.window.setResizable(true);
        this.window.setFullScreenable(true);
    }

}