import { useEffect } from "react";
import PhotoGrid from "../components/photoComps/PhotoGrid/PhotoGrid";
import { useAppDispatch } from "../store/hooks";
import { fetchPhotos } from "../store/photosSlice";

const Feed = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            fetchPhotos({
                url: "https://api.unsplash.com/photos?page=1&per_page=96",
                action: "overwrite",
            })
        );
    }, [dispatch]);

    return <PhotoGrid />;
};

export default Feed;
