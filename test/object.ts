import { resolve, format } from "../src/index";
import dataSource from "./datasource";
import { expect } from "chai";
import "mocha";

describe("object", () => {
    it("should return undefined to invoke resolve by invalid path.", () => {
        expect(resolve(undefined, dataSource.obj)).to.be.undefined;
    });
    it("should return undefined to invoke resolve by invalid params.", () => {
        expect(resolve('a', undefined)).to.be.undefined;
    });
    it("should fetch data correctly from object by key.", () => {
        expect(resolve('a', dataSource.obj)).to.equal(dataSource.obj.a);
    });
    it("should fetch data correctly from nested object.", () => {
        expect(resolve('obj.a', dataSource)).to.equal(dataSource.obj.a);
    });
    it("should fetch data correctly from deep nested object.", () => {
        expect(resolve('obj.e.f', dataSource)).to.equal(dataSource.obj.e.f);
    });
    it("should return undefined to invaoke resolve by no exists key.", () => {
        expect(resolve('obj.aa', dataSource)).to.be.undefined;
    });
});
