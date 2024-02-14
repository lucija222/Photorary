import "./PhotoGrid.scss";
import { useEffect, useRef } from "react";
import { FetchThunkArg } from "../../../util/helpers/types";
import NoResults from "../../searchComps/NoResults/NoResults";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchPhotos, resetPhotosStatus, selectPhotosIds, selectPhotosStatus } from "../../../store/photosSlice";
import ResizeObserverComp from "../../gridComps/observers/ResizeObserverComp/ResizeObserverComp";
import { setMainLoader } from "../../../store/loaderSlice";

interface PhotoGridProps {
    payload: FetchThunkArg;
}

const PhotoGrid = ({ payload }: PhotoGridProps) => {
    const dispatch = useAppDispatch();
    const photoIds = useAppSelector(selectPhotosIds);
    const photosStatus = useAppSelector((state) => selectPhotosStatus(state));
    const isDataLoaded = photosStatus === "succeeded";
    const isNoResults = photoIds.length === 0;
    const photosGridRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (photosStatus === "idle") {
            dispatch(fetchPhotos(payload));
        }

        return () => {
            if (photosStatus === "failed" || isDataLoaded) {
                dispatch(resetPhotosStatus());
            }
        };
    }, [dispatch, photosStatus, isDataLoaded, payload]);

    useEffect(() => {
        if (isNoResults) {
            dispatch(setMainLoader(false));
        }
    }, [dispatch, isNoResults]);

    return (
        <section id="photos-grid" ref={photosGridRef}>
            {isNoResults && isDataLoaded && <NoResults />}
            {!isNoResults && isDataLoaded && <ResizeObserverComp gridRef={photosGridRef} isPhotos={true} />}
        </section>
    );
};

export default PhotoGrid;
