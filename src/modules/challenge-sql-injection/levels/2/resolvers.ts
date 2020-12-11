import knex from "../../db";
import config from "../../config.json";

interface GetProductsByCategoryArguments {
    categoryName: string
}

interface Product {
    productId?: number,
    product_id?: number,
    categoryId?: number,
    category_id?: number
    name?: string,
    description?: string,
    price?: number
}
export default {
    Query: {
        getProductsByCategory: async (obj: undefined, args: GetProductsByCategoryArguments): Promise<Product[]> => {
            try {
                const categoryId = (args.categoryName.toLowerCase() === "laptops") ? 1 : args.categoryName; // simplify query without need for joins or extra tables
                const products: Product[] = await knex.columns([
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
                            name: product.name,
                            description: product.description,
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