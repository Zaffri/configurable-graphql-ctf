import { Product } from "../../../../../shared/sharedInterfaces";

interface GetProductsByCategoryArguments {
    categoryName: string
}

interface ModuleProduct extends Product {
    description: string,
    categoryId?: number, // product can have multiple cats, could sqli (2) be product type instead?
}

interface ProductFromDb {
    product_id: number,
    category_id: number,
    name: string,
    description: string,
    price: number
}

export {
    GetProductsByCategoryArguments,
    ModuleProduct,
    ProductFromDb
};