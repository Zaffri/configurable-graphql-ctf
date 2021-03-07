import knex from "../../db";
import { GetProductsByCategoryArguments, ModuleProduct as Product, ProductFromDb } from "./code/interfaces";
import { replaceFlagPlaceholder } from "./code/helpers";

export default {
    Query: {
        getProductsByCategory: async (obj: undefined, args: GetProductsByCategoryArguments): Promise<Product[]> => {
            try {
                const categoryName = args.categoryName.toLowerCase();
                const products: ProductFromDb[] = await knex.columns([
                    "product_id",
                    "category_id",
                    "name",
                    "description",
                    "price"
                ])
                    .select()
                    .from("products")
                    .whereRaw(`category_name="${categoryName}"`);

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