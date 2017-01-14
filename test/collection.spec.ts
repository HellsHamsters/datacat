import { Collection } from '../src/browser/app/helpers/collection';

describe('Browser.Helpers.Collection', () => {

    let list: Collection;

    beforeEach(() => {
        list = new Collection('default item');
    });

    it('collection.constructor should create item', () => {
        expect(list.length).toBe(1);
    });

    it('collection.add should create item', () => {

        list.add('second item');
        expect(list.length).toBe(2);

    });

});
