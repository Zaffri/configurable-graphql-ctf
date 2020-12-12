import { Module } from "module";
import { Product } from "../../../../../shared/sharedInterfaces";

interface ModuleProduct extends Product {
    categories?: Category[] | number[]
}

interface Category {
    categoryId: number,
    name: string,
    products: number[] | ModuleProduct[]
}

export {
    Category,
    ModuleProduct
};