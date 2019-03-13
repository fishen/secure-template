import { resolve, format } from "../src/index";
import dataSource from "./datasource";
import { expect } from "chai";
import "mocha";

describe("mix", () => {
    it("should fetch data correctly.", () => {
        expect(resolve('arr[1].a', dataSource)).to.equal((dataSource.arr[1] as any).a);
    });
    it("should fetch data correctly.", () => {
        expect(resolve('arr[1].b[0]', dataSource)).to.equal((dataSource.arr[1] as any).b[0]);
    });
    it("should fetch data correctly.", () => {
        expect(resolve('obj.b[2].c', dataSource)).to.equal((dataSource.obj.b[2] as any).c);
    });
    it("should fetch data correctly.", () => {
        expect(resolve('obj.e.g[0]', dataSource)).to.equal(dataSource.obj.e.g[0]);
    });
});
