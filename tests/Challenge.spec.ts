import * as path from "path";
import { expect } from "chai";
import dotenv from "dotenv";
dotenv.config();

import Challenge from "./../src/core/Challenge";

process.env.BASE_PROJECT_PATH = __dirname.replace(/tests(\/|\\|)/gi, "");

describe("Challenge.ts", () => {
    describe("When challenge config is set to a specific difficulty", () => {
        it("challenge should be set to that difficulty", () => {
            const name = "challenge-test";
            const description = "test challenge";
            const level = "1";
            const vulnerable = true;
            const extendsConfig = false;
            const expectedFolderPath = path.join(process.env.BASE_PROJECT_PATH, `/tests/test-modules/${name}/levels/${level}/`);

            const challenge = new Challenge(name, description, level, vulnerable, extendsConfig);
            const result = challenge.getModuleFolder();
            expect(expectedFolderPath).to.equal(result);
        });
    });
    describe("When challenge config is set to vulernable = true", () => {
        xit("challenge can be exploited", () => {
            console.log("pending test");
        });
    });
    describe("When challenge config is set to vulernable = false", () => {
        xit("challenge cannot be exploited", () => {
            console.log("pending test");
        });
    });
    describe("When challenge extends context", () => {
        it("GraphQL context is modified by challenge context callback", () => {
            const name = "challenge-test";
            const description = "test challenge";
            const level = "1";
            const vulnerable = true;
            const extendsConfig = true;

            const challenge = new Challenge(name, description, level, vulnerable, extendsConfig);
            const result = challenge.getExtendsContext();
            expect(result).to.equal(extendsConfig);
        });
    });
    describe("When challenges does not extend context", () => {
        it("GraphQL context is not modified", () => {
            const name = "challenge-test";
            const description = "test challenge";
            const level = "1";
            const vulnerable = true;
            const extendsConfig = false;

            const challenge = new Challenge(name, description, level, vulnerable, extendsConfig);
            const result = challenge.getExtendsContext();
            expect(result).to.equal(extendsConfig);
        });
    });
});