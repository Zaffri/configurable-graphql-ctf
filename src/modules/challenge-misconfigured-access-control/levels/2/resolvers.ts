import data from "../../module-data";
import config from "../../config.json";

type ProductArguments = {
    productId: number,
    price: number,
    apiToken: string
};

type Order = {
    orderId: number,
    orderNote: string,
    totalCost: number
};

interface User {
    userId: number,
    orders: Order[],
    isAdmin: boolean,
    apiToken: string
}

interface Product {
    productId: number,
    name: string,
    price: number
}

interface UpdateProductResponse {
    product: Product,
    successMessage: string
}

const isAdminToken = (apiToken: string): boolean => {
    const user = data.users.find(user => user.apiToken === apiToken);
    if(user) {
        return user.isAdmin;
    } else {
        throw new Error("API token is invalid.");
    }
};

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
                const successMessage = (args.productId !== 1) ? "Product updated." : `Congrats! ${config.flag}`;
                return {
                    product: {
                        productId: args.productId,
                        name: "Product name",
                        price: args.price
                    },
                    successMessage: successMessage
                };
            } else {
                throw new Error("You must be an admin to perform product updates!");
            }
        }
    }
};