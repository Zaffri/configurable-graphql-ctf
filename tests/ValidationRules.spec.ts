import * as path from "path";
import { expect } from "chai";
import dotenv from "dotenv";
dotenv.config();

import ValidationRules from "./../src/core/ValidationRules";

process.env.BASE_PROJECT_PATH = __dirname.replace(/tests(\/|\\|)/gi, "");

describe("ValidationRules.ts", () => {
    describe("When challenge level extends validation rules", () => {
        xit("modify validation rules", () => { console.log("pending"); });
    });
    describe("When challenge level extends validation rules", () => {
        xit("do not modify validation rules", () => { console.log("pending"); });
    });
});