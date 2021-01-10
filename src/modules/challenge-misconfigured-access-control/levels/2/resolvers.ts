import data from "../../module-data";
import config from "../../config.json";
import { ModuleUser as User, ProductArguments, UpdateProductResponse } from "./code/interfaces";
import { isAdminToken } from "./code/helpers";

export default {
    Query: {
        getUsers: (): User[] => {
            return data.users.map(user => {
                return {
                    userId: user.userId,
                    orders: user.orders,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    apiToken: user.apiToken
                };
            });
        }
    },
    Mutation: {
        updateProduct: (obj: undefined, args: ProductArguments): UpdateProductResponse => {
            const apiToken = args.apiToken;
            if(!apiToken) throw new Error("Please provide an API token.");

            if(isAdminToken(args.apiToken)) {
                if(args.productId === 1) {
                    const successMessage = `Congrats! ${config.flag}`;
                    return {
                        product: {
                            productId: args.productId,
                            name: "HP Elitebook Laptop",
                            price: args.price
                        },
                        successMessage: successMessage
                    };
                } else {
                    throw new Error("Cannot find product with ID " + args.productId);
                }
            } else {
                throw new Error("You must be an admin to perform product updates!");
            }
        }
    }
};