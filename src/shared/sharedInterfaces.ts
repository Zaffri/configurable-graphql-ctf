interface Product {
    productId: number
    name: string,
    price: number
}

interface User {
    userId: number
}

interface AuthenticateUser {
    email: string,
    password: string
}

export {
    AuthenticateUser,
    Product,
    User
};