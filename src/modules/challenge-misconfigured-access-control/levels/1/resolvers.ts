import data from "../../module-data";

type UserIdArguments = {
    userId: number
};

type Order = {
    orderId: number,
    orderNote: string,
    totalCost: number
};

interface User {
    userId: number,
    orders: Order[]
}

export default {
    Query: {
        getOrdersByUser: (): void => {
            throw new Error("You cannot query another users orders!");
        },
        getUserById: (obj: undefined, args: UserIdArguments): User => {
            const user = data.users.find(user => user.userId === args.userId);
            if(!user) throw new Error("Cannot find user with ID " + args.userId);
            return user;
        }
    }
};