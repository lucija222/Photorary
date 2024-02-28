import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isFullscreenPhotoView: false,
    photoId: ""
}

const fullscreenPhotoSlice = createSlice({
    name: "fullscreenPhoto",
    initialState: initialState,
    reducers: {
        setFullscreenPhoto(state, action) {
            state.photoId = action.payload;
            state.isFullscreenPhotoView = true;
        },
        resetFullscreenPhoto(state) {
            state.photoId = "";
            state.isFullscreenPhotoView = false;
        }
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

export const { setFullscreenPhoto, resetFullscreenPhoto } = fullscreenPhotoSlice.actions; 
export const { selectIsFullscreenPhoto, selectFullscreenPhotoId } = fullscreenPhotoSlice.selectors;
export default fullscreenPhotoSlice.reducer;