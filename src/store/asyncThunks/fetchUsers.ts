import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiUserObj, ApiUsersArray, FetchThunkArg, UsersArray } from "../../util/helpers/types";
import { AppDispatch, RootState } from "../store";
import { fetchData } from "../../util/helpers/functions/fetchData";
import { returnPayloadArray } from "../../util/helpers/functions/returnPayloadArray";
import { createUserObjectUrls } from "../../util/helpers/functions/createUserObjectUrls";

export const fetchUsers = createAsyncThunk<
    UsersArray,
    FetchThunkArg,
    { dispatch: AppDispatch }
>(
    "users/fetchUsers",
    async (obj, { dispatch }) => {
        const { url } = obj;
        const data: ApiUserObj | ApiUsersArray = await fetchData(
            url,
            dispatch,
            "usersSlice"
        );

        const dataArr: ApiUsersArray = returnPayloadArray(data);
        const dataWithObjUrls: UsersArray = await createUserObjectUrls(dataArr);
        return dataWithObjUrls;
    },
    {
        condition: (obj, { getState }) => {
            const state = getState() as RootState;
            const usersStatus = state.users.status;
            if (usersStatus !== "idle") {
                return false;
            }
        },
    }
);