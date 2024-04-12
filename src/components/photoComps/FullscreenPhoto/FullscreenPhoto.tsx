import "./FullscreenPhoto.scss";
import { MouseEventHandler } from "react";
import XButton from "../../buttons/XButton";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { resetFullscreenPhoto, selectFullscreenPhotoId, selectIsFullscreenPhoto } from "../../../store/fullscreenPhotoSlice";
import PhotoFrame from "../PhotoFrame/PhotoFrame";

const FullscreenPhoto = () => {
    const dispatch = useAppDispatch();
    const isFullscreenPhotoView = useAppSelector(selectIsFullscreenPhoto);
    const id = useAppSelector(selectFullscreenPhotoId);

    const handleCloseFullscreenPhoto: MouseEventHandler<HTMLButtonElement> = (
        e
    ) => {
        e.stopPropagation();
        dispatch(resetFullscreenPhoto(id));
    };

    return (
        <>
            {isFullscreenPhotoView && (
                <section id="fullscreen-photo-container">
                    <XButton handleButtonClick={handleCloseFullscreenPhoto} />
                    <PhotoFrame id={id} isLastElem={false} isObserverElem={false}/>
                </section>
            )}
        </>
    );
};

export default FullscreenPhoto;
