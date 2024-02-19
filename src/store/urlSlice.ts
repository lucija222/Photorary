import { createSelector, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { resetPhotosStatus } from "./photosSlice";
import { resetUsersStatus } from "./usersSlice";

interface InitState {
    page_num: number;
    totalPages: number,
    isMaxPages: boolean
    query: string;
    actionType: "overwrite" | "add";
}

const initialState: InitState = {
    page_num: 1,
    totalPages: 0,
    isMaxPages: false,
    query: "",
    actionType: "overwrite",
};

export const urlSlice = createSlice({
    name: "url",
    initialState,
    reducers: {
        incrementPageNum(state) {
            state.page_num += 1;
            state.actionType = "add";
        },
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
        setTotalPages(state, action: PayloadAction<number>) {
            state.totalPages = Math.ceil(action.payload / 30);
        }
    },
    extraReducers(builder) {
        builder.addMatcher(
            isAnyOf(resetPhotosStatus, resetUsersStatus),
            (state) => {
                state.page_num = 1;
                state.actionType = "overwrite";
            }
        );
    },
    selectors: {
        selectQuery: (state) => {
            return state.query;
        },
        selectPageNum: (state) => {
            return state.page_num;
        },
        selectTotalPages: (state) => {
            return state.totalPages;
        },
        selectActionType: (state) => {
            return state.actionType;
        }
    }
});

export const { incrementPageNum, setQuery, setTotalPages } = urlSlice.actions;
export const { selectQuery, selectPageNum, selectTotalPages, selectActionType } = urlSlice.selectors;

export const selectIsMaxPages = createSelector(
    [selectPageNum, selectTotalPages],
    (page, totalPages) => {
        return page === totalPages;
    }
);

export default urlSlice.reducer;
