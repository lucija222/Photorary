import { AppDispatch, RootState } from "./store";
import { fetchData } from "../util/helpers/functions/fetchData";
import { returnPayloadArray } from "../util/helpers/functions/returnPayloadArray";
import { createUserObjectUrls } from "../util/helpers/functions/createUserObjectUrls";
import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, } from "@reduxjs/toolkit";
import { ApiUserObj, ApiUsersArray, FetchThunkArg, InitAdapterState, Status, UserObj, UsersArray } from "../util/helpers/types";
import { incrementPageNum } from "./urlSlice";

const usersAdapter = createEntityAdapter<UserObj>();

const initAdapterState: InitAdapterState = {
    status: "idle",
    error: "",
};

const initialState = usersAdapter.getInitialState(initAdapterState);

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

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
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
                        usersAdapter.setAll(state, data);
                        break;

                    case "add":
                        usersAdapter.addMany(state, data);
                        break;
                }

                state.status = "succeeded";
            })
            .addCase(incrementPageNum, (state) => {
                state.status = "idle";
            })
    },
    selectors: {
        selectUsersStatus: (state): Status => {
            return state.status;
        },
    }
});

export const {
    selectById: selectUserById,
    selectIds: selectUsersIds,
} = usersAdapter.getSelectors((state: RootState) => state.users);

export const { resetUsersStatus } = usersSlice.actions;
export const { selectUsersStatus } = usersSlice.selectors;

export const selectUserForProfile = (state: RootState): string => {
    const usersIds = selectUsersIds(state);
    return usersIds[0];
};

export const selectCheckUsersStatus = (statusType: Status) =>
    createSelector(selectUsersStatus, (status) => {
        return status === statusType;
    });

export const selectIsNoUserResults = createSelector(
    [selectUsersStatus, selectUsersIds],
    (status, idArr) => {
        return status === "succeeded" && idArr.length === 0;
    }
);


export default usersSlice.reducer;
