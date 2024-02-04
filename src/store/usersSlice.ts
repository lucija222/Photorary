import { AppDispatch, RootState } from "./store";
import { ApiUserObj, ApiUsersArray, FetchThunkArg, InitAdapterState } from "../util/helpers/types";
import { fetchData } from "../util/helpers/functions/fetchData";
import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { returnPayloadArray } from "../util/helpers/functions/returnPayloadArray";

const usersAdapter = createEntityAdapter<ApiUserObj>();

const initAdapterState: InitAdapterState = {
    status: "idle",
    loader: false,
    error: "",
    totalSearchResults: 0,
};

const initialState = usersAdapter.getInitialState(initAdapterState);

export const fetchUsers = createAsyncThunk<
    void,
    FetchThunkArg,
    { dispatch: AppDispatch }
>("users/fetchUsers", async (obj, { dispatch }) => {
    const { url, action } = obj;
    const data = await fetchData(url, dispatch, "usersSlice");

    dispatch(
        action === "overwrite"
            ? overwriteUsers(data)
            : addUsers(data)
    );
});

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        overwriteUsers(state, action: PayloadAction<ApiUsersArray | ApiUserObj>) {
            usersAdapter.setAll(state, returnPayloadArray(action.payload));
            state.loader = false;
        },
        addUsers(state, action: PayloadAction<ApiUsersArray>) {
            usersAdapter.addMany(state, action.payload);
        },
        setTotalUserSearchResults(state, action:PayloadAction<number>) {
            state.totalSearchResults = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loader = true;
                state.status = "pending";
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = "failed";
                if (action.error.message) {
                    state.error = action.error.message;
                }
            })
            .addCase(fetchUsers.fulfilled, (state) => {
                state.status = "succeeded";
            });
    },
});

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUsersIds,
} = usersAdapter.getSelectors((state: RootState) => state.users);

export const selectUserForProfile = (state: RootState) => {
    const usersArr = selectAllUsers(state);
    return usersArr[0];
};
export const selectUserLoader = (state: RootState) => {return state.users.loader};
export const { overwriteUsers, addUsers, setTotalUserSearchResults } = usersSlice.actions;
export default usersSlice.reducer;
