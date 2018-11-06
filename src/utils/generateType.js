/**
 * 返回 types
 * @param {*} key 
 */
export const generateTypes = (key) => {
    return [`${key}_REQUEST`,`${key}_SUCCESS`,`${key}_FAILURE`]
}

export const SUCCESS = 1;
export const FAILURE = 2;
export const REQUEST = 0;