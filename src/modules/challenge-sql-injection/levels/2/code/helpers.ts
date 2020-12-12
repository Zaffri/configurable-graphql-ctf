import config from "../../../config.json";

const replaceFlagPlaceholder = (val) => {
    if(typeof(val) !== "string") return val;
    return val.replace("FLAG", config.flag);  
};

export {
    replaceFlagPlaceholder
};