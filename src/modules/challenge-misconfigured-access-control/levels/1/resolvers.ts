import data from "../../module-data";

interface User {
    userId: number,
    orders: [
        {
            orderId: number,
            orderNote: string,
            totalCost: number
        }
    ]
}

export default {
    Query: {
        getOrdersByUser: (): void => {
            throw new Error("You cannot query another users orders!");
        },
        getUserById: (obj: undefined, args): User => {
            const user = data.users.find(user => user.userId === args.userId);
            if(!user) throw new Error("Cannot find user with ID " + args.userId);
            console.log(user);
            return user;
        }
    }
};