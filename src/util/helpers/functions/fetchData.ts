import { AppDispatch } from "../../../store/store";
import { setTotalPhotosSearchResults } from "../../../store/photosSlice";
import { setTotalUserSearchResults } from "../../../store/usersSlice";

const apiKey = process.env.REACT_APP_API_KEY;

export const fetchData = async (
    url: string,
    dispatch: AppDispatch,
    slice: "usersSlice" | "photosSlice"
) => {
    const response = await fetch(url, {
        headers: {
            Authorization: `Client-ID ${apiKey}`,
        },
    });
    const data = await response.json();
    const isPhotosSlice = slice === "photosSlice";

    if (url.includes("/search/")) {
        dispatch(
            isPhotosSlice
                ? setTotalPhotosSearchResults(data.total)
                : setTotalUserSearchResults(data.total)
        );
        return data.results;

    } else {
        dispatch(
            isPhotosSlice
                ? setTotalPhotosSearchResults(0)
                : setTotalUserSearchResults(0)
        );
        return data;
    }
};
