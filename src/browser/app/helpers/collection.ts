export class Collection {

    private items: any[];

    constructor(...args) {
        this.items = args;
    }

    public random() {
        return this.items[Math.floor((Math.random() * this.items.length))];
    }

}
