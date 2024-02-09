import { AppDispatch, RootState } from "./store";
import { fetchData } from "../util/helpers/functions/fetchData";
import { createObjectURLs } from "../util/helpers/functions/createObjectURLs";
import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitAdapterState, ApiPhotosArray, FetchThunkArg, PhotosArray, PhotoObj } from "../util/helpers/types";

const photosAdapter = createEntityAdapter<PhotoObj>();
const initAdapterState: InitAdapterState = {
    status: "idle",
    error: "",
    totalResults: 0,
};

const initialState = photosAdapter.getInitialState(initAdapterState);

export const fetchPhotos = createAsyncThunk<
    void,
    FetchThunkArg,
    { dispatch: AppDispatch }
>("photos/fetchPhotos", async (obj, { dispatch }) => {
    const { url, action } = obj;
    const data: ApiPhotosArray = await fetchData(url, dispatch, "photosSlice");
    const dataWithObjUrls: PhotosArray = await createObjectURLs(data);

    dispatch(
        action === "overwrite"
            ? overwritePhotos(dataWithObjUrls)
            : addPhotos(dataWithObjUrls)
    );
});

const photosSlice = createSlice({
    name: "photos",
    initialState,
    reducers: {
        overwritePhotos(state, action: PayloadAction<PhotosArray>) {
            state.ids.forEach((id) => {
                const photo = state.entities[id];
                URL.revokeObjectURL(photo.urls.small_object_url);
            });

            photosAdapter.setAll(state, action.payload);
            state.status = "succeeded";
        },
        addPhotos(state, action: PayloadAction<PhotosArray>) {
            photosAdapter.addMany(state, action.payload);
        },
        setTotalPhotosResults(state, action: PayloadAction<number>) {
            state.totalResults = action.payload;
        },
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
                state.status = "failed";
                if (action.error.message) {
                    state.error = action.error.message;
                }
            });
        // .addCase(fetchPhotos.fulfilled, (state) => {
        //     state.status = "succeeded";
        // });
    },
});

export const {
    selectAll: selectAllPhotos,
    selectById: selectPhotoById,
    selectIds: selectPhotosIds,
} = photosAdapter.getSelectors((state: RootState) => state.photos);

export const selectPhotosStatus = (state: RootState) => {
    return state.photos.status;
};
export const selectLastPhotoId = createSelector(selectPhotosIds, (idArray) => {
    return idArray[idArray.length - 1];
});

export const {
    overwritePhotos,
    addPhotos,
    setTotalPhotosResults,
    resetPhotosStatus,
} = photosSlice.actions;

export default photosSlice.reducer;
