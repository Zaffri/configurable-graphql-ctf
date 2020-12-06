import Challenge from "./Challenge";

export default class ValidationRules {
    private challengesThatExtendValidationRules: Challenge[] = [];
    private defaultValidationRulesFileName = "validationRules.js";

    constructor(challenges: Challenge[]) {
        this.challengesThatExtendValidationRules = challenges;
    }

    public async getValidationRules(): Promise<any[]> {
        if(!this.challengesThatExtendValidationRules.length) return null;
        let validationRules = [];

        for(let x=0; x<this.challengesThatExtendValidationRules.length; x++) {
            const challenge = this.challengesThatExtendValidationRules[x];
            const challengeRulesFunc = await import(challenge.getModuleFolder() + this.defaultValidationRulesFileName);
            const challengeRules = challengeRulesFunc.default();

            if(challengeRules && Array.isArray(challengeRules)) validationRules = validationRules.concat(challengeRules);
        }
        return validationRules;
    }
}