const isUserAdmin = (context: any): boolean => {
    console.log(context);
    if(context && context.user && context.user.isAdmin) {
        return true;
    } else {
        return false;
    }
};
export {
    isUserAdmin
};