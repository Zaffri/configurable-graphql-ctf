import data from "../../../module-data";

const isAdminToken = (apiToken: string): boolean => {
    const user = data.users.find(user => user.apiToken === apiToken);
    if(user) {
        return user.isAdmin;
    } else {
        throw new Error("API token is invalid.");
    }
};

export {
    isAdminToken
};