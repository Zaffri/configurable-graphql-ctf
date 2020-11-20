import * as path from "path";
export default class Challenge {
    private name: string;
    private description: string;
    private level: number;
    private vulnerable: boolean;
    private activeModuleFolder: string;

    private defaultModuleFolder = "levels";

    constructor(name: string, description: string, level: number, vulnerable: boolean) {
        this.name = name;
        this.description = description;
        this.level = level;
        this.vulnerable = vulnerable;
        this.setModuleFolder();
    }

    private setModuleFolder() {
        const folderPath = path.join(__dirname, `./../modules/${this.name}/${this.defaultModuleFolder}/${this.level}/`);
        this.activeModuleFolder = folderPath;
    }

    public getModuleFolder(): string {
        return this.activeModuleFolder;
    }
}