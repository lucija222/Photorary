import { AppDispatch, RootState } from "./store";
import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitAdapterState, ApiPhotosArray, FetchThunkArg, ApiPhotoObj } from "../util/helpers/types";
import { fetchData } from "../util/helpers/functions/fetchData";

const photosAdapter = createEntityAdapter<ApiPhotoObj>();
const initAdapterState: InitAdapterState = {
    status: "idle",
    loader: false,
    error: "",
    totalSearchResults: 0,
};

const initialState = photosAdapter.getInitialState(initAdapterState);

export const fetchPhotos = createAsyncThunk<
    void,
    FetchThunkArg,
    { dispatch: AppDispatch }
>("photos/fetchPhotos", async (obj, { dispatch }) => {

    const { url, action } = obj;
    const data: ApiPhotosArray = await fetchData(url, dispatch, "photosSlice");

    dispatch(
        action === "overwrite"
            ? overwritePhotos(data)
            : addPhotos(data)
    );
});

const photosSlice = createSlice({
    name: "photos",
    initialState,
    reducers: {
        overwritePhotos(state, action: PayloadAction<ApiPhotosArray>) {
            photosAdapter.setAll(state, action.payload);
        },
        addPhotos(state, action: PayloadAction<ApiPhotosArray>) {
            photosAdapter.addMany(state, action.payload);
        },
        setTotalPhotosSearchResults(state, action: PayloadAction<number>) {
            state.totalSearchResults = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPhotos.pending, (state) => {
                state.loader = true;
                state.status = "pending";
            })
            .addCase(fetchPhotos.rejected, (state, action) => {
                state.status = "failed";
                if (action.error.message) {
                    state.error = action.error.message;
                }
            })
            .addCase(fetchPhotos.fulfilled, (state) => {
                state.status = "succeeded";
            });
    },
});

export const {
    selectAll: selectAllPhotos,
    selectById: selectPhotoById,
    selectIds: selectPhotosIds,
} = photosAdapter.getSelectors((state: RootState) => state.photos);

export const { overwritePhotos, addPhotos, setTotalPhotosSearchResults } = photosSlice.actions;
export default photosSlice.reducer;