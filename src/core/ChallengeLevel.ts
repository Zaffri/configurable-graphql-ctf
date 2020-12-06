import Fs from "fs";
import * as path from "path";
import Challenge from "./Challenge";

export default class ChallengeLevel {
    private challenge: Challenge;
    private defaultLevelConfigName = "level.json";
    private extendsContext: boolean;
    private extendsValidationRules: boolean;
    
    constructor(challenge: Challenge) {
        this.challenge = challenge;
        this.setLevelConfiguration();
    }

    public setLevelConfiguration(): void {
        const levelPath = this.challenge.getModuleFolder();
        try {
            const fileContents = Fs.readFileSync(path.join(levelPath, this.defaultLevelConfigName), "utf8");
            const data = JSON.parse(fileContents);

            this.extendsContext = data.extendsContext;
            this.extendsValidationRules = data.extendsValidationRules;
        } catch(err) {
            throw new Error(`Cannot find level config file: ${levelPath} - ${err}`);
        }
    }

    public getExtendsContext(): boolean {
        return this.extendsContext;
    }

    public getExtendsValidationRules(): boolean {
        return this.extendsValidationRules;
    }
}