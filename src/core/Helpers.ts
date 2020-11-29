export default {
    setBaseProjectPath: (pathFromIndex: string): void => {
        const regex = /dist(\/|\\|)/gi; 
        process.env.BASE_PROJECT_PATH = pathFromIndex.replace(regex, "");
    },
    getBaseModulesPath: (): string => {
        return (process.env.NODE_ENV !== "test") ? process.env.CORE_MODULES_PATH : process.env.TEST_MODULES_PATH;
    }
};