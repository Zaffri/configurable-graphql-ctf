import { Product, User } from "../../../../../shared/sharedInterfaces";

type ProductArguments = {
    productId: number,
    price: number,
    apiToken: string
};

interface Order {
    orderId: number,
    orderNote: string,
    totalCost: number
}

interface ModuleUser extends User {
    orders: Order[],
    isAdmin: boolean,
    apiToken: string
}

interface UpdateProductResponse {
    product: Product,
    successMessage: string
}

export { ModuleUser, ProductArguments, UpdateProductResponse };