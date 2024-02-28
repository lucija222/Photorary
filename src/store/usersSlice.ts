import { RootState } from "./store";
import { incrementPageNum } from "./urlSlice";
import { createEntityAdapter, createSelector, createSlice, } from "@reduxjs/toolkit";
import { InitAdapterState, Status, UserObj } from "../util/helpers/types";
import { fetchUsers } from "./asyncThunks/fetchUsers";

const usersAdapter = createEntityAdapter<UserObj>();

const initAdapterState: InitAdapterState = {
    status: "idle",
    error: "",
};

const initialState = usersAdapter.getInitialState(initAdapterState);

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
