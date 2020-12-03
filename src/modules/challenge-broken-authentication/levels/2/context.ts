import jwt from "jsonwebtoken";

const appSecret = "1234"; // pull from module location or add feature to module for confguring secrets?

export default function(req: any, context: any): any {
    const token = req.headers.authorization || "";

    if(token) {
        return jwt.verify(token, appSecret, { algorithms: ["none", "HS256"] }, (err: Error, decoded: any) => {
            if (!err && decoded) {
                return { user: decoded.user };
            } else {
                if(!req.headers["apollo-query-plan-experimental"]) console.log(err);
                return null;
            }
        });
    } else {
        return null;
    }
}