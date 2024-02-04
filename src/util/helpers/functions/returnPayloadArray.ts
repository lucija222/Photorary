import { ApiUserObj, ApiUsersArray } from "../types";

export const returnPayloadArray = (payload: ApiUsersArray | ApiUserObj) => {

    let payloadArr: ApiUsersArray;

    if (Array.isArray(payload)) {
        payloadArr = payload;
    } else {
        payloadArr = [payload];
    }

    return payloadArr;
};