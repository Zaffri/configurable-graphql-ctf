import depthLimit from "graphql-depth-limit";
import config from "../../config.json";

export default function(req: any, context: any): any {
    return [depthLimit(5, {}, (o) => console.log(o), `Congrats! ${config.flag}`)];
}