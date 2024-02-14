import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface InitState {
    page_num: number,
    query: string,
    actionType: "overwrite" | "add";
}

const initialState: InitState = {
    page_num: 1,
    query: "",
    actionType: "overwrite"
};

export const urlSlice = createSlice({
    name: "url",
    initialState,
    reducers: {
        incrementPageNum(state) {
            state.page_num += 1;
            state.actionType = "add";
        },
        resetPageNum(state) {
            state.page_num = 1;
            state.actionType = "overwrite";
        },
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
    },
});

export const selectQuery = (state: RootState) => {
    return state.url.query;
};

export const selectPageNum = (state: RootState) => {
    return state.url.page_num;
};

export const selectActionType = (state: RootState) => {
    return state.url.actionType;
};

export const {
    incrementPageNum,
    resetPageNum,
    setQuery,
} = urlSlice.actions;

export default urlSlice.reducer;
