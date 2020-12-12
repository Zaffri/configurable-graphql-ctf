import knex from "../../db";
import config from "../../config.json";
import { GetProductsByCategoryArguments, ModuleProduct as Product, ProductFromDb } from "./code/interfaces";

const replaceFlagPlaceholder = (val) => {
    if(typeof(val) !== "string") return val;
    return val.replace("FLAG", config.flag);  
};

export default {
    Query: {
        getProductsByCategory: async (obj: undefined, args: GetProductsByCategoryArguments): Promise<Product[]> => {
            try {
                const categoryId = (args.categoryName.toLowerCase() === "laptops") ? 1 : args.categoryName; // simplify query without need for joins or extra tables
                const products: ProductFromDb[] = await knex.columns([
                    "product_id",
                    "category_id",
                    "name",
                    "description",
                    "price"
                ])
                    .select()
                    .from("products")
                    .whereRaw(`category_id="${categoryId}"`);

                console.log(products);

                if(products && products.length) {
                    const formattedProducts = products.map(product => {
                        return {
                            productId: product.product_id,
                            categoryId: product.category_id,
                            name: replaceFlagPlaceholder(product.name),
                            description: replaceFlagPlaceholder(product.description),
                            price: product.price
                        };
                    });
                    return formattedProducts;
                } else {
                    throw new Error("Cannot find any products for category: " + args.categoryName);
                }
            } catch(e) {
                throw new Error(e);
            }
        }
    }
};