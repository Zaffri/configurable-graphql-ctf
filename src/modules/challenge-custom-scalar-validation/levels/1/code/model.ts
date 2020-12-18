import { MongoClient } from "mongodb";
import { resetPasswordRequestResult } from "./interfaces";

const passwordReset = (client: MongoClient, userId: number, resetToken: any): Promise<resetPasswordRequestResult[]> => {
    const db = client.db();

    return new Promise((resolve, reject) => {
        db.collection("password_reset_requests")
            .find({user_id: userId, reset_token: resetToken})
            .limit(1)
            .toArray(function(err, data) {
                if(err) {
                    console.log("Fail - " + err);
                    reject(err);
                }   else {
                    console.log(JSON.stringify(data));
                    resolve(data);
                }
            });
    });
};

export {
    passwordReset
};