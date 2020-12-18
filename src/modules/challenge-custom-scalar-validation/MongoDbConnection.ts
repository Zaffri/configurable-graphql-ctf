import { MongoClient } from "mongodb";

export default class MongoDbConnection {
    private host: string;
    private port: number;
    private dbName: string;
    private user: string;
    private pass: string;
    private dbConnectionString: string;

    constructor(host: string, port: number, dbName: string, user: string, pass: string) {
        this.host = host;
        this.port = port;
        this.dbName = dbName;
        this.user = user;
        this.pass = pass;
        this.setDbConnectionString();
    }

    private setDbConnectionString(): void {
        let connectionString = "";

        if(!this.host || !this.port || !this.dbName) {
            throw new Error("MongoDB host, port and db name must be provided for challenge: custom scalar validation");
        }

        if(!this.user || !this.pass) {
            connectionString = `mongodb://${this.host}:${this.port}/${this.dbName}`;
        } else {
            connectionString = `mongodb://${this.user}:${this.pass}@${this.host}:${this.port}/${this.dbName}?authSource=admin`;
        }
        this.dbConnectionString = connectionString;
        console.log(this.dbConnectionString);
    }

    public async getMongoClient(): Promise<MongoClient> {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.dbConnectionString, (err, client) => {
                if(err) {
                    console.log("Error: " + err);
                    reject("Error: " + err);
                } else {
                    resolve(client);
                }
            });
        });
    }
}