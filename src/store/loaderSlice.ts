import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { resetPhotosStatus } from "./photosSlice";
import { resetUsersStatus } from "./usersSlice";
import { incrementPageNum } from "./urlSlice";

const initialState = {
    mainLoader: true,
    scrollLoader: false,
};

export const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        turnOffMainLoader(state) {
            if (state.mainLoader === true) {
                state.mainLoader = false;
            }
        },
        turnOffScrollLoader(state) {
            state.scrollLoader = false;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(incrementPageNum, (state) => {
                state.scrollLoader = true;
            })
            .addMatcher(
                isAnyOf(resetPhotosStatus, resetUsersStatus),
                (state) => {
                    if (state.mainLoader === false) {
                        state.mainLoader = true;
                    }
                }
            );
    },
    selectors: {
        selectMainLoader: (state): boolean => {
            return state.mainLoader;
        },
        selectScrollLoader: (state): boolean => {
            return state.scrollLoader;
        }
    }
});

export const { turnOffMainLoader, turnOffScrollLoader } = loaderSlice.actions;
export const { selectMainLoader, selectScrollLoader } = loaderSlice.selectors;

export default loaderSlice.reducer;
