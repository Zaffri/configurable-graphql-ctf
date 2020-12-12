import config from "../../config.json";
import data from "../../module-data";
import { Product } from "../../../../shared/sharedInterfaces";

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
                return allProducts.slice(startingPoint, endPoint);
            } else {
                throw new Error(`Congrats! ${config.flag}`);
            }
        }
    }
};