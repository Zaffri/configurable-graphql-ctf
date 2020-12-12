import { AuthenticateUser } from "../../../../../shared/sharedInterfaces";

interface Document {
    name: string,
    private: boolean,
    category: string,
    fileContents: string
}

export {
    AuthenticateUser,
    Document
};