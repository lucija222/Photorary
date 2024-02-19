import { AppDispatch } from "../../../store/store";
import { authHeader } from "../constants";
import { setTotalPages } from "../../../store/urlSlice";

export const fetchData = async (
    url: string,
    dispatch: AppDispatch,
    slice: "usersSlice" | "photosSlice"
) => {    
    const response = await fetch(url, authHeader);    
    const data = await response.json();
    const isPhotosSlice = slice === "photosSlice";
    console.log(response);
    

    if (url.includes("/search/")) { //Set for search results
        dispatch(setTotalPages(data.total));
        return data.results;

    } else if (!isPhotosSlice) { //Set for profile
        dispatch(setTotalPages(data.total_photos));

    } else if (!(url.includes("/users/") && url.includes("/photos?"))) { //Set for feed
        dispatch(setTotalPages(900));
    } 

    return data;
};
