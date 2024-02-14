import { AppDispatch, RootState } from "./store";
import { fetchData } from "../util/helpers/functions/fetchData";
import { createPhotoObjectUrls } from "../util/helpers/functions/createPhotoObjectUrls";
import {
    InitAdapterState, ApiPhotosArray, FetchThunkArg, PhotosArray, PhotoObj,
} from "../util/helpers/types";
import {
    createAsyncThunk, createEntityAdapter, createSlice, PayloadAction,
} from "@reduxjs/toolkit";

const photosAdapter = createEntityAdapter<PhotoObj>();
const initAdapterState: InitAdapterState = {
    status: "idle",
    error: "",
    totalResults: 0,
};

const initialState = photosAdapter.getInitialState(initAdapterState);

export const fetchPhotos = createAsyncThunk<
    PhotosArray,
    FetchThunkArg,
    { dispatch: AppDispatch }
>("photos/fetchPhotos", async (obj, { dispatch }) => {
    const { url } = obj;
    const data: ApiPhotosArray = await fetchData(url, dispatch, "photosSlice");
    const dataWithObjUrls: PhotosArray = await createPhotoObjectUrls(data);

    return dataWithObjUrls;
});

const photosSlice = createSlice({
    name: "photos",
    initialState,
    reducers: {
        setTotalPhotosResults(state, action: PayloadAction<number>) {
            state.totalResults = action.payload;
        },
        resetPhotosStatus(state) {
            state.status = "idle";
        },
        resetPhotosAndUsersStatus(state) {
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
            });
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

export const {
    setTotalPhotosResults,
    resetPhotosStatus,
    resetPhotosAndUsersStatus
} = photosSlice.actions;

export default photosSlice.reducer;