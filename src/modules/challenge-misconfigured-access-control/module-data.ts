import config from "./config.json";

export default {
    users: [
        {
            userId: 1,
            email: "john.doe@graphql.ctf",
            orders: [
                {
                    orderId: 1,
                    orderNote: `Congrats! ${config.flag}`,
                    totalCost: 100.00
                }
            ],
            apiToken: "39m329!@fsk49sdl",
            isAdmin: false
        },
        {
            userId: 2,
            email: "joe.bloggs@graphql.ctf",
            orders: [],
            apiToken: "13asdP_eo282m5sOe0",
            isAdmin: false
        },
        {
            userId: 3,
            email: "admin@graphql.ctf",
            orders: [],
            apiToken: "232d49!_eo385sasP",
            isAdmin: true
        }
    ]
};