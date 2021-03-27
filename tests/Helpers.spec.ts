import { expect } from "chai";
import Helpers from "../src/core/Helpers";

describe("Helpers.ts", () => {
    beforeEach(() => {
        process.env.NODE_ENV = "test";
    });
    describe("#setBaseProjectPath", () => {
        describe("When API is started", () => {
            it("base project path should be defined", () => {
                const fakePath = "C:\\FakeTestPath\\";
                Helpers.setBaseProjectPath(fakePath);
                expect(process.env.BASE_PROJECT_PATH).equal(fakePath);
            });
        });
    });
    describe("#getBaseModulesPath", () => {
        describe("When API is in test mode", () => {
            it("load in test modules", () => {
                const expected = "/tests/test-modules";
                const result = Helpers.getBaseModulesPath();
                expect(result).to.equal(expected);
            });
        });
        describe("When API is not in test mode", () => {
            it("load in core modules", () => {
                process.env.NODE_ENV = "prod";
                const expected = "/dist/modules";
                const result = Helpers.getBaseModulesPath();
                expect(result).to.equal(expected);
            });
        });
    });
});