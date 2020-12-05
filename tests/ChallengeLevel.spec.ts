import * as path from "path";
import { expect } from "chai";
import dotenv from "dotenv";
dotenv.config();

import ChallengeLvel from "./../src/core/ChallengeLevel";

process.env.BASE_PROJECT_PATH = __dirname.replace(/tests(\/|\\|)/gi, "");

describe("ChallengeLevel.ts", () => {
    describe("When challenge level extends context", () => {
        xit("modify GraphQL context", () => { console.log("pending"); });
    });
    describe("When challenge level does not extend context", () => {
        xit("do not modify GraphQL context", () => { console.log("pending"); });
    });
});