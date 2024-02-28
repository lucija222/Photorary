import { createAsyncThunk } from "@reduxjs/toolkit";
import { authHeader } from "../../util/helpers/constants";

interface FullscreenThunkArg {
    id: string;
    url: string;
}

export const fetchFullscreenPhoto = createAsyncThunk<string, FullscreenThunkArg>(
    "photos/setFullscreenPhoto",
    async ({ url }) => {
        const imgResponse = await fetch(url, authHeader);
        const imgBlob = await imgResponse.blob();
        const imgObjUrl = URL.createObjectURL(imgBlob);
        return imgObjUrl;
    }
);
