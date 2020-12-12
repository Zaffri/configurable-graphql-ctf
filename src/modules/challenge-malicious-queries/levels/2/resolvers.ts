import data from "../../module-data";
import { Category, ModuleProduct as Product } from "./code/interfaces";

const pageSizeLimit = 50;

export default {
    Query: {
        getProducts: (obj: undefined, args: { page: number, pageSize: number }): Product[] => {
            const pageSize = args.pageSize;
            const page = args.page;
            const allProducts = data.products;

            if(!page) throw new Error("Error: paging starts at 1");

            if(pageSize <= pageSizeLimit) {
                const startingPoint = (page * pageSize) - pageSize;
                const endPoint = (startingPoint + pageSize);
                const pageProducts = allProducts.slice(startingPoint, endPoint);
                return pageProducts;
            } else {
                throw new Error(`There is a max page size of ${pageSizeLimit}`);
            }
        }
    },
    Product: {
        categories: (obj: Product): Category[] => {
            const categoryIds = obj.categories;
            const categoriesFormatted: Category[] = [];

            categoryIds.forEach((categoryId: number) => {
                const categoryData = data.categories.find(cat => cat.categoryId === categoryId);
                categoriesFormatted.push(categoryData);
            });
            return categoriesFormatted;
        }
    },

    Category: {
        products: (obj: Category): Product[] => {
            const productIds = obj.products;
            const productsFormatted: Product[] = [];

            productIds.forEach((productId: number) => {
                const productData = data.products.find(p => p.productId === productId);
                productsFormatted.push(productData);
            });
            return productsFormatted;
        } 
    }
};