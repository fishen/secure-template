import { resolve, format } from "../src/index";
import { expect } from "chai";
import "mocha";

const ds = {
    name: "fisher",
    address: {
        city: 'BeiJing',
        location: {
            lat: 39.90,
            long: 116.40,
        },
    },
    colors: ['blue', 'green'],
    books: [{
        name: 'name1',
        author: 'author1'
    }]
}

describe('format', () => {
    it('should be format correctly.', () => {
        const str = format(`My name is {name} and I am from {address.city}.`, ds);
        expect(str).to.be.equal(`My name is ${ds.name} and I am from ${ds.address.city}.`);
    });
    it('should be fromat correctly by fetching data from object.', () => {
        const str = format("My latitude and longitude are ({address.location.lat}, {address.location.long}).", ds);
        expect(str).to.be.equal(`My latitude and longitude are (${ds.address.location.lat}, ${ds.address.location.long}).`);
    });
    it('should be fromat correctly by fetching data from array.', () => {
        const str = format("My favorite book is <<{books[0].name}>>.", ds);
        expect(str).to.be.equal(`My favorite book is <<${ds.books[0].name}>>.`);
    });
    it('should be fromat correctly by fetching data from array.', () => {
        const str = format("I like {0} and {1}.", ds.colors);
        expect(str).to.be.equal(`I like ${ds.colors[0]} and ${ds.colors[1]}.`);
    });
})