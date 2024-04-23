import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchFullscreenPhoto } from "./asyncThunks/fetchFullscreenPhoto";

const initialState = {
    photoId: "",
};

const fullscreenPhotoSlice = createSlice({
    name: "fullscreenPhoto",
    initialState: initialState,
    reducers: {
        resetFullscreenPhoto(state, action: PayloadAction<string>) {
            state.photoId = "";
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchFullscreenPhoto.fulfilled, (state, action) => {
            state.photoId = action.meta.arg.id;
        });
    },
    selectors: {
        selectFullscreenPhotoId: (state): string => {
            return state.photoId;
        },
    },
});

export const { resetFullscreenPhoto } = fullscreenPhotoSlice.actions;
export const { selectFullscreenPhotoId } = fullscreenPhotoSlice.selectors;

export default fullscreenPhotoSlice.reducer;
