import config from "./config.json";

export default {
    users: [
        {
            userId: 1,
            email: "john@graphql.ctf",
            orders: [
                {
                    orderId: 1,
                    orderNote: `Congrats! ${config.flag}`,
                    totalCost: 100.00
                }
            ]
        }
    ]
};