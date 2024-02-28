import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchFullscreenPhoto } from "./asyncThunks/fetchFullscreenPhoto";

const initialState = {
    isFullscreenPhotoView: false,
    photoId: ""
};

const fullscreenPhotoSlice = createSlice({
    name: "fullscreenPhoto",
    initialState: initialState,
    reducers: {
        resetFullscreenPhoto(state, action: PayloadAction<string>) {
            state.photoId = "";
            state.isFullscreenPhotoView = false;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchFullscreenPhoto.fulfilled, (state, action) => {
                state.photoId = action.meta.arg.id;
                state.isFullscreenPhotoView = true;
            })
    },
    selectors: {
        selectIsFullscreenPhoto: (state): boolean => {
            return state.isFullscreenPhotoView;
        },
        selectFullscreenPhotoId: (state): string => {
            return state.photoId;
        }
    }
});

export const { resetFullscreenPhoto } = fullscreenPhotoSlice.actions; 
export const { selectIsFullscreenPhoto, selectFullscreenPhotoId } = fullscreenPhotoSlice.selectors;
export default fullscreenPhotoSlice.reducer;