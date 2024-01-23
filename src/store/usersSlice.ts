import { AppDispatch, RootState } from "./store";
import { ApiUsersArray, FetchThunkArg, InitAdapterState } from "../util/helpers/types";
import { fetchData } from "../util/helpers/functions/fetchData";
import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter();

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
    const data: ApiUsersArray = await fetchData(url, dispatch, "usersSlice");

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
        overwriteUsers(state, action: PayloadAction<ApiUsersArray>) {
            usersAdapter.setAll(state, action.payload);
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
                state.error = action.error.message;
            })
            .addCase(fetchUsers.fulfilled, (state) => {
                state.status = "succeeded";
            });
    },
});

export const {
    selectAll: SelectAllUsers,
    selectById: SelectUserById,
    selectIds: SelectUsersIds,
} = usersAdapter.getSelectors((state: RootState) => state.users);

export const { overwriteUsers, addUsers, setTotalUserSearchResults } = usersSlice.actions;
export default usersSlice.reducer;
