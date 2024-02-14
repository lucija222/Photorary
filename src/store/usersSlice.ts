import { AppDispatch, RootState } from "./store";
import { fetchData } from "../util/helpers/functions/fetchData";
import {
    ApiUserObj, ApiUsersArray, FetchThunkArg, InitAdapterState, UserObj, UsersArray,
} from "../util/helpers/types";
import {
    createAsyncThunk, createEntityAdapter, createSlice, PayloadAction,
} from "@reduxjs/toolkit";
import { returnPayloadArray } from "../util/helpers/functions/returnPayloadArray";
import { resetPhotosAndUsersStatus } from "./photosSlice";
import { createUserObjectUrls } from "../util/helpers/functions/createUserObjectUrls";

const usersAdapter = createEntityAdapter<UserObj>();

const initAdapterState: InitAdapterState = {
    status: "idle",
    error: "",
    totalResults: 0,
};

const initialState = usersAdapter.getInitialState(initAdapterState);

export const fetchUsers = createAsyncThunk<
    UsersArray,
    FetchThunkArg,
    { dispatch: AppDispatch }
>("users/fetchUsers", async (obj, { dispatch }) => {
    const { url } = obj;
    const data: ApiUserObj | ApiUsersArray = await fetchData(
        url,
        dispatch,
        "usersSlice"
    );

    const dataArr: ApiUsersArray = returnPayloadArray(data);
    const dataWithObjUrls: UsersArray = await createUserObjectUrls(dataArr);
    return dataWithObjUrls;
});

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setTotalUsersResults(state, action: PayloadAction<number>) {
            state.totalResults = action.payload;
        },
        resetUsersStatus(state) {
            state.status = "idle";
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                if (action.error.message) {
                    state.error = action.error.message;
                }
                state.status = "failed";
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                const actionType = action.meta.arg.action;
                const data = action.payload;

                switch (actionType) {
                    case "overwrite":
                        // usersAdapter.setAll(state, returnPayloadArray(data));
                        usersAdapter.setAll(state, data);
                        break;

                    case "add":
                        usersAdapter.addMany(state, data);
                        break;
                }

                state.status = "succeeded";
            })
            .addCase(resetPhotosAndUsersStatus, (state) => {
                state.status = "idle";
            })
    },
});

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUsersIds,
} = usersAdapter.getSelectors((state: RootState) => state.users);

export const selectUserForProfile = (state: RootState) => {
    const usersIds = selectUsersIds(state);
    return usersIds[0];
};

export const selectUsersStatus = (state: RootState) => {
    return state.users.status;
};

export const { setTotalUsersResults, resetUsersStatus } = usersSlice.actions;
export default usersSlice.reducer;
