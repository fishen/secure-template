import { resolve, format } from "../src/index";
import dataSource from "./datasource";
import { expect } from "chai";
import "mocha";

describe("array", () => {
    it("should return undefined to invoke resolve by invalid path.", () => {
        expect(resolve(undefined, dataSource.arr)).to.be.undefined;
    });
    it("should return undefined to invoke resolve by invalid params.", () => {
        expect(resolve('0', undefined)).to.be.undefined;
    });
    it("should fetch data correctly from array by index.", () => {
        expect(resolve('0', dataSource.arr)).to.equal(dataSource.arr[0]);
    });
    it("should fetch data correctly from nested array.", () => {
        expect(resolve('3[2]', dataSource.arr)).to.equal((dataSource.arr[3] as any)[2]);
    });
    it("should fetch data correctly from deep nested array.", () => {
        expect(resolve('3[2][0]', dataSource.arr)).to.equal((dataSource.arr[3] as any)[2][0]);
    });
    it("should return undefined to invaoke resolve by no exists key.", () => {
        expect(resolve('4', dataSource.arr)).to.be.undefined;
    });
});
