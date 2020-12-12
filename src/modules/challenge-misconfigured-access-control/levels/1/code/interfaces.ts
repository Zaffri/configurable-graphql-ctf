import { User } from "../../../../../shared/sharedInterfaces";

interface Order {
    orderId: number,
    orderNote: string,
    totalCost: number
}

interface ModuleUser extends User {
    orders: Order[]
}

export { ModuleUser };