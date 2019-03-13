import { format, defaultReplace } from "../src/index";
import { expect } from "chai";
import "mocha";

const ds = {
    name: "fisher",
    birth: new Date('aaa')
}

const str = format('I am {name}, my birthday is {birth}.', ds, (value) => {
    if (value instanceof Date && isNaN(value.valueOf())) {
        return new Date().toDateString();
    } else {
        return defaultReplace(value);
    }
})

describe('replacer', () => {
    it('should be format correctly with custom replacer.', () => {
        expect(str).to.be.equal(`I am ${ds.name}, my birthday is ${new Date().toDateString()}.`);
    });
})