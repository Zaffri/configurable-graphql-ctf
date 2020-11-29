import { expect } from "chai";

import Context from "./../src/core/Context";

describe("Context.ts", () => {
    describe("When GraphQL context is extended by 1 challenge module", () => {
        xit("modify context using Challenge's context callback", () => {
            console.log("pending test");
        });
    });
    describe("When GraphQL context is extended by multiple challenge modules", () => {
        xit("modify context by passing it to all context callbacks", () => {
            console.log("pending test");
        });
    });
    describe("When GraphQL context is not extended by any challenge modules", () => {
        xit("do not return context", () => {
            console.log("pending test");
        });
    });
});