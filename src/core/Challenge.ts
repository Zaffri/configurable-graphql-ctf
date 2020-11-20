export default class Challenge {
    private name: string;
    private description: string;
    private level: number;
    private vulnerable: boolean;

    constructor(name: string, description: string, level: number, vulnerable: boolean) {
        this.name = name;
        this.description = description;
        this.level = level;
        this.vulnerable = vulnerable;
    }

    public getName(): string {
        return this.name;
    }
}