import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState = {
    mainLoader: true,
    scrollLoader: false
};

export const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        setMainLoader(state, action) {
            state.mainLoader = action.payload;
        },
        setScrollLoader(state, action) {
            state.scrollLoader = action.payload;
        }
    }
});

export const { setMainLoader, setScrollLoader } = loaderSlice.actions;

export const selectMainLoader = (state: RootState) => {
    return state.loader.mainLoader;
}
export const selectScrollLoader = (state: RootState) => {
    return state.loader.scrollLoader;
}

export default loaderSlice.reducer;