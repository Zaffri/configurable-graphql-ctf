import { User } from "./sharedInterfaces";

type EmailArguments = {
    email: string
}

type IdArguments = {
    id: number
}

interface ModuleUser extends User {
    email: string,
    forename: string,
    surname: string
}

export default {
    Query: {
        getUserByEmail: (obj: undefined, args: EmailArguments): ModuleUser => {
            return {
                userId: 1,
                email: args.email,
                forename: "steven",
                surname: "morrison"
            };
        }
    },
    Mutation: {
        updateProfile(obj: undefined, args: IdArguments): ModuleUser {
            return {
                userId: args.id,
                email: "steven@test.com",
                forename: "steven",
                surname: "morrison"
            };
        }
    } 
};