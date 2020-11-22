import { expect } from "chai";

import Configuration from "./../src/core/Configuration";
import ChallengeListItem from "./../src/core/interfaces/ChallengeListItem";
import ChallengeListFixtures from "./fixtures/Configuration-ChallengeList.json";
import ChallengeListNoModulesFixtures from "./fixtures/Configuration-ChallengeListNoModules.json";

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
    describe("When configuration has no enabled modules set", () => {
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
});