import * as path from "path";
import { expect } from "chai";

import Challenge from "./../src/core/Challenge";

describe("Challenge.ts", () => {
    describe("When challenge config is set to a specific difficulty", () => {
        it("challenge should be set to that difficulty", () => {
            const name = "challenge-test";
            const description = "test challenge";
            const level = "10";
            const vulnerable = true;
            const expectedFolderPath = path.join(__dirname, `./../src/modules/${name}/levels/${level}/`);

            const challenge = new Challenge(name, description, level, vulnerable);
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
});