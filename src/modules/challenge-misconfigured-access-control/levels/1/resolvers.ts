import data from "../../module-data";
import { ModuleUser as User } from "./code/interfaces";

export default {
    Query: {
        getOrdersByUser: (): void => {
            throw new Error("You cannot query another users orders!");
        },
        getUserById: (obj: undefined, args: { userId: number }): User => {
            const user = data.users.find(user => user.userId === args.userId);
            if(!user) throw new Error("Cannot find user with ID " + args.userId);
            return user;
        }
    }
};