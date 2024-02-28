import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiPhotosArray, FetchThunkArg, PhotosArray } from "../../util/helpers/types";
import { AppDispatch, RootState } from "../store";
import { fetchData } from "../../util/helpers/functions/fetchData";
import { createPhotoObjectUrls } from "../../util/helpers/functions/createPhotoObjectUrls";

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