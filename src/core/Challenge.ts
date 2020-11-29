import * as path from "path";
import Helpers from "./Helpers";
export default class Challenge {
    private name: string;
    private description: string;
    private level: string;
    private vulnerable: boolean;
    private activeModuleFolder: string;
    private extendsContext: boolean;

    private defaultDifficultyFolderName = "levels";

    constructor(name: string, description: string, level: string, vulnerable: boolean, extendsContext: boolean) {
        this.name = name;
        this.description = description;
        this.level = level;
        this.vulnerable = vulnerable;
        this.extendsContext = extendsContext;
        this.setModuleFolder();
    }

    private setModuleFolder() {
        const challengeLevelPath = `${Helpers.getBaseModulesPath()}/${this.name}/${this.defaultDifficultyFolderName}/${this.level}/`;
        const fullPath = path.join(process.env.BASE_PROJECT_PATH, challengeLevelPath);
        this.activeModuleFolder = fullPath;
    }

    public getModuleFolder(): string {
        return this.activeModuleFolder;
    }

    public getName(): string {
        return this.name;
    }

    public getExtendsConfig(): boolean {
        return this.extendsContext;
    }
}