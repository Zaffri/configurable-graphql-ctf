import * as path from "path";
export default class Challenge {
    private name: string;
    private description: string;
    private level: string;
    private vulnerable: boolean;
    private activeModuleFolder: string;

    private defaultDifficultyFolderName = "levels";

    constructor(name: string, description: string, level: string, vulnerable: boolean) {
        this.name = name;
        this.description = description;
        this.level = level;
        this.vulnerable = vulnerable;
        this.setModuleFolder();
    }

    private setModuleFolder() {
        const folderPath = path.join(__dirname, `./../modules/${this.name}/${this.defaultDifficultyFolderName}/${this.level}/`);
        this.activeModuleFolder = folderPath;
    }

    public getModuleFolder(): string {
        return this.activeModuleFolder;
    }

    public getName(): string {
        return this.name;
    }
}