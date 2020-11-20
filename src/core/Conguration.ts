import Challenge from "./Challenge";
import ChallengeConfiguration from "./ChallengeConfiguration";
import ChallengeListItem from "./ChallengeListItem";
import Fs from "fs";
import * as path from "path";

export default class Configuration {
    private enabledChallenges: Challenge[] = [];

    constructor(challengeList: ChallengeListItem[]) {
        this.setEnabledChallenges(challengeList);
    }

    private setEnabledChallenges(challengeList: ChallengeListItem[]) {
        const enabledChallenges: Challenge[] = [];
        
        challengeList.forEach((challengeListItem: ChallengeListItem) => {
            if(challengeListItem.enabled) {
                const config: ChallengeConfiguration = this.getChallengeConfiguration(challengeListItem.name);
                const challenge = new Challenge(config.name, config.description, config.level, config.vulnerable);
                enabledChallenges.push(challenge);
            }
        });
        this.enabledChallenges = enabledChallenges;
    }

    private getChallengeConfiguration(challengeName: string): ChallengeConfiguration {
        try {
            const challengeModulePath = `./../modules/${challengeName}/config.json`;
            const data = Fs.readFileSync(path.join(__dirname, challengeModulePath), "utf8");
            return JSON.parse(data);
        } catch(err) {
            throw new Error("Cannot resolve config.json for " + challengeName + " - " + err);
        }
    }

    public getEnabledChallenges(): Challenge[] {
        return this.enabledChallenges;
    }
}