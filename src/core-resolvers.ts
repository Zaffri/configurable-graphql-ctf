type EmailArguments = {
    email: string
}

type IdArguments = {
    id: number
}

interface User {
    userId: number,
    email: string,
    forename: string,
    surname: string
}

export default {
    Query: {
        getUserByEmail: (obj: undefined, args: EmailArguments): User => {
            return {
                userId: 1,
                email: args.email,
                forename: "steven",
                surname: "morrison"
            };
        }
    },
    Mutation: {
        updateProfile(obj: undefined, args: IdArguments): User {
            return {
                userId: args.id,
                email: "steven@test.com",
                forename: "steven",
                surname: "morrison"
            };
        }
    } 
};