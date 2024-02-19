import { AppDispatch, RootState } from "./store";
import { incrementPageNum } from "./urlSlice";
import { fetchData } from "../util/helpers/functions/fetchData";
import { createPhotoObjectUrls } from "../util/helpers/functions/createPhotoObjectUrls";
import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, } from "@reduxjs/toolkit";
import { InitAdapterState, ApiPhotosArray, FetchThunkArg, PhotosArray, PhotoObj, Status } from "../util/helpers/types";

const photosAdapter = createEntityAdapter<PhotoObj>();
const initAdapterState: InitAdapterState = {
    status: "idle",
    error: "",
};

const initialState = photosAdapter.getInitialState(initAdapterState);

export const fetchPhotos = createAsyncThunk<
    PhotosArray,
    FetchThunkArg,
    { dispatch: AppDispatch }
>(
    "photos/fetchPhotos",
    async (obj, { dispatch }) => {
        const { url } = obj;
        const data: ApiPhotosArray = await fetchData(
            url,
            dispatch,
            "photosSlice"
        );
        const dataWithObjUrls: PhotosArray = await createPhotoObjectUrls(data);

        return dataWithObjUrls;
    },
    {
        condition: (obj, { getState }) => {
            const state = getState() as RootState;
            const photosStatus = state.photos.status;
            if (photosStatus !== "idle") {
                return false;
            }
        },
    }
);

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
