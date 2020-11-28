import Challenge from "./Challenge";

export default class Context {
    private challengesThatExtendContext: Challenge[] = [];
    private defaultContextFileName = "context.js"; 
    
    constructor(challenges: Challenge[]) {
        this.challengesThatExtendContext = challenges;
    }

    public async getContext(): Promise<any> {
        if(!this.challengesThatExtendContext.length) return null;
        let contextObj = {};

        for(let x=0; x<this.challengesThatExtendContext.length; x++) {
            const challenge = this.challengesThatExtendContext[x];
            const contextFunction = await import(challenge.getModuleFolder() + this.defaultContextFileName);
            const newContext = contextFunction.default(contextObj);
            contextObj = newContext;
        }
        return contextObj;
    }
}