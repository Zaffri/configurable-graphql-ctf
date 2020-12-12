import data from "../../module-data";
import { Document, DocumentCategory } from "./code/interfaces";

export default {
    Query: {
        getDocuments: (obj: undefined, args: { filterByPrivateDocuments: boolean }): Document[] => {
            if(!args.filterByPrivateDocuments) {
                return data.documents.filter((document) => !document.private);
            } else {
                throw new Error("Only logged in staff members can access private documents");
            }
        },
        getDocumentsByCategory: (obj: undefined, args: { categoryName: string }): Document[] => {
            const categoryInput = args.categoryName.toLowerCase();
            const documentsByCategory: Document[] = data.documents.filter((document) => document.category.toLowerCase() === categoryInput);

            if(!documentsByCategory.length) throw new Error(`Cannot find any documents for category: ${categoryInput}`);
            return documentsByCategory;
        },
        listDocumentCategories: (): DocumentCategory[] => {
            return data.categories;
        }
    }
};