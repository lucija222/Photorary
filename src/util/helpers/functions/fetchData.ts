import { AppDispatch } from "../../../store/store";
import { setTotalPhotosSearchResults } from "../../../store/photosSlice";
import { setTotalUserSearchResults } from "../../../store/usersSlice";
import { authHeader } from "../constants";

export const fetchData = async (
    url: string,
    dispatch: AppDispatch,
    slice: "usersSlice" | "photosSlice"
) => {
    const response = await fetch(url, authHeader);
    const data = await response.json();
    const isPhotosSlice = slice === "photosSlice";

    const handleSearchResultsTotal = (payload: number) => {
        return isPhotosSlice
        ? setTotalPhotosSearchResults(payload)
        : setTotalUserSearchResults(payload)
    }

    if (url.includes("/search/")) {
        dispatch(
            handleSearchResultsTotal(data.total)
        );
        return data.results;

    } else {
        dispatch(
            handleSearchResultsTotal(0)
        );
        return data;
    }
};
