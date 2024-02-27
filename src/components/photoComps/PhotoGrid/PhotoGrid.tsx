import "./PhotoGrid.scss";
import { useEffect, useRef } from "react";
import Loader from "../../UIComponents/Loader/Loader";
import { FetchThunkArg } from "../../../util/helpers/types";
import NoResults from "../../UIComponents/NoResults/NoResults";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectScrollLoader, turnOffMainLoader, } from "../../../store/loaderSlice";
import RenderDynamicGridColumns from "../../gridComps/RenderDynamicGridColumns/RenderDynamicGridColumns";
import { fetchPhotos, resetPhotosStatus, selectCheckPhotoStatus, selectIsNoPhotoResults, }from "../../../store/photosSlice";

interface PhotoGridProps {
    payload: FetchThunkArg;
}

const PhotoGrid = ({ payload }: PhotoGridProps) => {
    const dispatch = useAppDispatch();
    const isStatusIdle = useAppSelector(selectCheckPhotoStatus("idle"));
    const isScrollLoader = useAppSelector(selectScrollLoader);
    const isNoResults = useAppSelector(selectIsNoPhotoResults);
    const photosGridRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (isStatusIdle) {
            dispatch(fetchPhotos(payload));
        }
    }, [dispatch, isStatusIdle, payload]);

    useEffect(() => {
        return () => {
            dispatch(resetPhotosStatus());
        };
    }, [dispatch]);

    useEffect(() => {
        if (isNoResults) {
            dispatch(turnOffMainLoader());
        }
    }, [dispatch, isNoResults]);

    return (
        <>
           <section id="photos-grid" ref={photosGridRef}>
            {isNoResults && <NoResults />}
            <RenderDynamicGridColumns
                gridRef={photosGridRef}
                isPhotoGrid={true}
            />
        </section>
        {isScrollLoader && <Loader type="in-grid" />}
        </>
    );
};

export default PhotoGrid;
