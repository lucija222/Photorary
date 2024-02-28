import { RootState } from "./store";
import { incrementPageNum } from "./urlSlice";
import { resetFullscreenPhoto } from "./fullscreenPhotoSlice";
import { InitAdapterState, PhotoObj, Status } from "../util/helpers/types";
import { createEntityAdapter, createSelector, createSlice, } from "@reduxjs/toolkit";
import { fetchPhotos } from "./asyncThunks/fetchPhotos";
import { fetchFullscreenPhoto } from "./asyncThunks/fetchFullscreenPhoto";

const photosAdapter = createEntityAdapter<PhotoObj>();
const initAdapterState: InitAdapterState = {
    status: "idle",
    error: "",
};

const initialState = photosAdapter.getInitialState(initAdapterState);

const photosSlice = createSlice({
    name: "photos",
    initialState,
    reducers: {
        resetPhotosStatus(state) {
            state.status = "idle";
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPhotos.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPhotos.rejected, (state, action) => {
                if (action.error.message) {
                    state.error = action.error.message;
                }
                state.status = "failed";
            })
            .addCase(fetchPhotos.fulfilled, (state, action) => {
                const actionType = action.meta.arg.action;
                const data = action.payload;

                switch (actionType) {
                    case "overwrite":
                        if (state.ids.length > 0) {
                            state.ids.forEach((id) => {
                                const photo = state.entities[id];
                                URL.revokeObjectURL(
                                    photo.urls.small_object_url
                                );
                            });
                        }
                        photosAdapter.setAll(state, data);
                        break;

                    case "add":
                        photosAdapter.addMany(state, data);
                        break;
                }

                state.status = "succeeded";
            })
            .addCase(incrementPageNum, (state) => {
                state.status = "idle";
            })
            .addCase(fetchFullscreenPhoto.fulfilled, (state, action) => {
                const id = action.meta.arg.id;
                const regularObjUrl = action.payload;
                const entity = state.entities[id];
                if (entity) {
                    entity.urls.regular_object_url = regularObjUrl;
                }
            })
            .addCase(resetFullscreenPhoto, (state, action) => {
                const entity = state.entities[action.payload];
                URL.revokeObjectURL(entity.urls.regular_object_url);
                entity.urls.regular_object_url = "";
            })
    },
    selectors: {
        selectPhotosStatus: (state): Status => {
            return state.status;
        },
    },
});

export const { selectById: selectPhotoById, selectIds: selectPhotosIds } =
    photosAdapter.getSelectors((state: RootState) => state.photos);

export const { resetPhotosStatus } = photosSlice.actions;
export const { selectPhotosStatus } = photosSlice.selectors;

export const selectCheckPhotoStatus = (statusType: Status) =>
    createSelector(selectPhotosStatus, (status) => {
        return status === statusType;
    });

export const selectIsNoPhotoResults = createSelector(
    [selectPhotosStatus, selectPhotosIds],
    (status, idArr) => {
        return status === "succeeded" && idArr.length === 0;
    }
);

export default photosSlice.reducer;
