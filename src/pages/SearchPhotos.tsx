import { useEffect, } from "react";
import { useBeforeUnload } from "react-router-dom";
import PhotoGrid from "../components/photoComps/PhotoGrid/PhotoGrid";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectActionType, selectPageNum, selectQuery, setQuery,} from "../store/urlSlice";

const SearchPhotos = () => {
    const dispatch = useAppDispatch();
    const query = useAppSelector(selectQuery);
    const page = useAppSelector(selectPageNum);
    const action = useAppSelector(selectActionType);
    const url = `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=30`;
    const payload = {
        url: url,
        action: action,
    };

    useBeforeUnload(() => {
        sessionStorage.setItem("photoQuery", query);
    });

    useEffect(() => {
        if (!query) {
            const queryFromStorage = sessionStorage.getItem("photoQuery");
            queryFromStorage && dispatch(setQuery(queryFromStorage));
        }
    }, [dispatch, query]);

    return <>{query && <PhotoGrid payload={payload} />}</>;
};

export default SearchPhotos;
