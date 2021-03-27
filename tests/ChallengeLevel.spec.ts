import { expect } from "chai";
import dotenv from "dotenv";
import Challenge from "../src/core/Challenge";
import ChallengeLevel from "../src/core/ChallengeLevel";
dotenv.config();

process.env.BASE_PROJECT_PATH = __dirname.replace(/tests(\/|\\|)/gi, "");

describe("ChallengeLevel.ts", () => {
    describe("When challenge level extends context", () => {
        it("modify GraphQL context", () => {
            const testConfig = {
                "name": "challenge-3",
                "description": "Test Module 3",
                "level": "1",
                "vulnerable": true,
                "flag": "FLAG_Rteh42NXir75bvOl"
            };
            const challenge = new Challenge(testConfig.name, testConfig.description, testConfig.level, testConfig.vulnerable);
            const challengeLevel = new ChallengeLevel(challenge);

            expect(challengeLevel.getExtendsContext()).to.equal(true);
        });
    });
    describe("When challenge level does not extend context", () => {
        it("do not modify GraphQL context", () => {
            const testConfig = {
                "name": "challenge-2",
                "description": "Test Module 2",
                "level": "2",
                "vulnerable": true,
                "flag": "FLAG_xiwrLV9Xirij7vlP"
            };
            const challenge = new Challenge(testConfig.name, testConfig.description, testConfig.level, testConfig.vulnerable);
            const challengeLevel = new ChallengeLevel(challenge);

            expect(challengeLevel.getExtendsContext()).to.equal(false);
        });
    });
});