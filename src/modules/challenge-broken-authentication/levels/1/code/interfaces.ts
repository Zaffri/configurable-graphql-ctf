interface Document {
    name: string,
    private: boolean,
    category: string,
    fileContents: string
}

interface DocumentCategory {
    name: string,
    private: boolean,
    description: string
}

export {
    Document,
    DocumentCategory
};