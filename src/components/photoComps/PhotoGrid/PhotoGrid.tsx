import "./PhotoGrid.scss";
import { useEffect, useRef } from "react";
import Loader from "../../UIComponents/Loader/Loader";
import { FetchThunkArg } from "../../../util/helpers/types";
import { selectScrollLoader } from "../../../store/loaderSlice";
import NoResults from "../../UIComponents/NoResults/NoResults";
import FullscreenPhoto from "../FullscreenPhoto/FullscreenPhoto";
import { fetchPhotos } from "../../../store/asyncThunks/fetchPhotos";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import RenderDynamicGridColumns from "../../gridComps/RenderDynamicGridColumns/RenderDynamicGridColumns";
import { resetPhotosStatus, selectCheckPhotoStatus, selectIsNoPhotoResults, }from "../../../store/photosSlice";

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

    return (
        <>
            <section id="photos-grid" ref={photosGridRef}>
                {isNoResults ? (
                    <NoResults />
                ) : (
                    <RenderDynamicGridColumns
                        gridRef={photosGridRef}
                        isPhotoGrid={true}
                    />
                )}
            </section>
            {isScrollLoader && <Loader type="in-grid" />}
            <FullscreenPhoto />
        </>
    );
};

export default PhotoGrid;
