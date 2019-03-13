import { compile } from "../src/index";
import { expect } from "chai";
import "mocha";

const myFormat = compile('I am {name}, I am {age} years old and my hobby is {hobby}. My favorite {hobby} is Transformers.');

describe('compile', () => {
    it('should be format correctly with custom replacer.', () => {
        const data = { name: 'fisher', age: 18, hobby: 'movie' };
        const data2 = { name: 'jack', age: 20, hobby: 'song' };
        expect(myFormat(data)).to.be.equal(`I am ${data.name}, I am ${data.age} years old and my hobby is ${data.hobby}. My favorite ${data.hobby} is Transformers.`);
        expect(myFormat(data2)).to.be.equal(`I am ${data2.name}, I am ${data2.age} years old and my hobby is ${data2.hobby}. My favorite ${data2.hobby} is Transformers.`);
    });
})