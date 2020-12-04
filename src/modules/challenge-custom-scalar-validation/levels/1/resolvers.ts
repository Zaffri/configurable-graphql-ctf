import { Document, GetDocumentsArguments } from "../../module-types";
import data from "../../module-data";
import JSONString from "./JSONString";

export default {
    Mutation: {
        resetCustomerPassword: (obj: undefined, args) => {
            console.log("Reset customer pass");
        }
    },
    JSONString
};