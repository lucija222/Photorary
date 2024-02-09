import { useEffect } from "react";
import PhotoGrid from "../components/photoComps/PhotoGrid/PhotoGrid";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
    fetchPhotos, resetPhotosStatus, selectPhotosStatus,
} from "../store/photosSlice";
import { setMainLoader } from "../store/loaderSlice";

const Feed = () => {
    const dispatch = useAppDispatch();
    const photosStatus = useAppSelector((state) =>
        selectPhotosStatus(state)
    );

    useEffect(() => {
            if (photosStatus === "idle") {
                dispatch(
                    fetchPhotos({
                        url: "https://api.unsplash.com/photos?page=2&per_page=31",
                        action: "overwrite",
                    })
                );
            }

        return () => {
            if (photosStatus === "failed" || photosStatus === "succeeded") {
                dispatch(resetPhotosStatus());
                dispatch(setMainLoader(true));
            }
        };
    }, [dispatch, photosStatus]);

    return (
        <>
            <PhotoGrid />
        </>
    );
};

export default Feed;
