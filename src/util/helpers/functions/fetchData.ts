import { AppDispatch } from "../../../store/store";
import { setTotalPhotosResults } from "../../../store/photosSlice";
import { setTotalUsersResults } from "../../../store/usersSlice";
import { authHeader } from "../constants";

export const fetchData = async (
    url: string,
    dispatch: AppDispatch,
    slice: "usersSlice" | "photosSlice"
) => {    
    
    const response = await fetch(url, authHeader);
    const data = await response.json();
    const isPhotosSlice = slice === "photosSlice";

    const handleResultsTotal = (payload: number) => {
        return isPhotosSlice
            ? setTotalPhotosResults(payload)
            : setTotalUsersResults(payload);
    };

    if (url.includes("/search/")) { //Set num of search results
        dispatch(handleResultsTotal(data.total));
        return data.results;

    } else if (!isPhotosSlice) { //Set num of photos for a profile
        dispatch(setTotalPhotosResults(data.total_photos));

    } else { //Reset - for feed when there's no limit
        dispatch(handleResultsTotal(0));
    }

    return data;
};
