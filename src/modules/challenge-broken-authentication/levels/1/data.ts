import config from "./../../config.json";

export default {
    categories: [
        {
            name: "General information",
            private: false,
            description: "Category for general ecommerce information"
        },
        {
            name: "Staff Security",
            private: true,
            description: "Internal documentation for staff security"
        }
    ],
    documents: [
        {
            name: "Ecommerce Store",
            private: false,
            category: "General information",
            fileContents: "We have an array of products in our online store."
        },
        {
            name: "Frequently Asked Questions (FAQs)",
            private: false,
            category: "General information",
            fileContents: "1. What is this website? A: This is an Ecommerce website. 2. Do you deliver outside the UK? A: No, we only deliver to mainland UK."
        },
        {
            name: "Internal Security Policies",
            private: true,
            category: "Staff Security",
            fileContents: `Congrats! ${config.flag}`
        }
    ]
};