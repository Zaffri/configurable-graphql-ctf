import { expect } from "chai";

import Configuration from "./../src/core/Configuration";
import Challenge from "./../src/core/Challenge";
import ChallengeListItem from "./../src/core/interfaces/ChallengeListItem";
import ChallengeListFixtures from "./fixtures/configuration/ChallengeList.json";
import ChallengeListNoModulesFixtures from "./fixtures/configuration/ChallengeListNoModules.json";
import ChallengeListContextExtendedFixtures from "./fixtures/configuration/ChallengeListContextExtended.json";
import ChallengeListNoContextExtendedFixtures from "./fixtures/configuration/ChallengeListNoContextExtended.json";

describe("Configuration.ts", () => {
    describe("When configuration has at least 1 enabled modules set", () => {
        it("setup enabled modules", () => {
            const expected = ChallengeListFixtures.filter((challenge: ChallengeListItem) => challenge.enabled).map((challenge) => challenge.name);

            const configuration = new Configuration(ChallengeListFixtures);
            const enabledChallenges = configuration.getEnabledChallenges();

            const result = enabledChallenges.every((challenge) => expected.includes(challenge.getName()));
            expect(result).to.equal(true);
        });
    });
    describe("When configuration has no enabled modules", () => {
        it("prevent API from starting", async () => {
            const expectedError = "You must have at least 1 challenge module enabled. Modules can enabled at 'challenge-list.json'"; 
            let resultError = ""; 

            try {
                new Configuration(ChallengeListNoModulesFixtures);
            } catch(err) {
                resultError = err.message;
            }
            expect(expectedError).to.equal(resultError);
        });
    });
    describe("When configuration has extended context", () => {
        it("GraphQL context should be modified by module's context callbacks", async () => {
            const expected = ["challenge-1"];

            const configuration = new Configuration(ChallengeListContextExtendedFixtures);
            const isContextExtended = configuration.isContextExtended();
            const modulesThatExtendContext: Challenge[] = configuration.getModulesThatExtendContext();

            const result = modulesThatExtendContext.every((challenge) => expected.includes(challenge.getName()));
            expect(isContextExtended).to.equal(true);
            expect(result).to.equal(true);
        });
    });
    describe("When configuration does not extend context", () => {
        it("GraphQL context is not modified", async () => {
            const configuration = new Configuration(ChallengeListNoContextExtendedFixtures);
            const isContextExtended = configuration.isContextExtended();
            const modulesThatExtendContext: Challenge[] = configuration.getModulesThatExtendContext();

            const result = modulesThatExtendContext.length === 0;
            expect(isContextExtended).to.equal(false);
            expect(result).to.equal(true);
        });
    });
});