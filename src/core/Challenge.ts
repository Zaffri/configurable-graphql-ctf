import * as path from "path";
import Helpers from "./Helpers";
import ChallengeLevel from "./ChallengeLevel";
export default class Challenge {
    private name: string;
    private description: string;
    private levelFolder: string;
    private level: ChallengeLevel;
    private vulnerable: boolean;
    private activeModuleFolder: string;

    private defaultDifficultyFolderName = "levels";

    constructor(name: string, description: string, levelFolder: string, vulnerable: boolean) {
        this.name = name;
        this.description = description;
        this.levelFolder = levelFolder;
        this.vulnerable = vulnerable;
        this.setLevel();
    }

    private setLevel() {
        this.setModuleFolder();
        this.level = new ChallengeLevel(this);
    }

    private setModuleFolder() {
        const challengeLevelPath = `${Helpers.getBaseModulesPath()}/${this.name}/${this.defaultDifficultyFolderName}/${this.levelFolder}/`;
        const fullPath = path.join(process.env.BASE_PROJECT_PATH, challengeLevelPath);
        this.activeModuleFolder = fullPath;
    }

    public getModuleFolder(): string {
        return this.activeModuleFolder;
    }

    public getName(): string {
        return this.name;
    }

    public getExtendsContext(): boolean {
        return this.level.getExtendsContext();
    }
}