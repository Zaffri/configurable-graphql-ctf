export interface Document {
    name: string,
    private: boolean,
    category: string,
    fileContents: string
}

export type GetDocumentsArguments = {
    filterByPrivateDocuments: boolean
}
