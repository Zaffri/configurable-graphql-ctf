import config from "../../config.json";
import data from "../../module-data";

const pageSizeLimit = 50;

interface GetProductsArguments {
    page: number,
    pageSize: number
}

interface Product {
    productId: number,
    name: string,
    cost: number
}

export default {
    Query: {
        getProducts: (obj: undefined, args: GetProductsArguments, context, info): Product[] => {
            console.log(context);
            console.log(info);
            const pageSize = args.pageSize;
            const page = args.page;
            const allProducts = data.products;

            if(!page) throw new Error("Error: paging starts at 1");

            if(pageSize <= pageSizeLimit) {
                const startingPoint = (page * pageSize) - pageSize;
                const endPoint = (startingPoint + pageSize);
                return allProducts.slice(startingPoint, endPoint);
            } else {
                throw new Error(`There is a max page size of ${pageSizeLimit}`);
            }
        }
    }
};