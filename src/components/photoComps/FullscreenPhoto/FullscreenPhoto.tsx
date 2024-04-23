import "./FullscreenPhoto.scss";
import { MouseEventHandler } from "react";
import PhotoFrame from "../PhotoFrame/PhotoFrame";
import SvgButton from "../../buttons/SvgButton";
import { XSvg } from "../../../assets/svg/exports";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { resetFullscreenPhoto, selectFullscreenPhotoId } from "../../../store/fullscreenPhotoSlice";

const FullscreenPhoto = () => {
    const dispatch = useAppDispatch();
    const id = useAppSelector(selectFullscreenPhotoId);

    const handleCloseFullscreen: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        dispatch(resetFullscreenPhoto(id));
    };

    return (
        <>
            {id && (
                <section className="fullscreen-photo-container">
                    <SvgButton
                        SvgComponent={XSvg}
                        handleButtonClick={handleCloseFullscreen}
                    />
                    <PhotoFrame
                        id={id}
                        isLastElem={false}
                        isObserverElem={false}
                    />
                </section>
            )}
        </>
    );
};

export default FullscreenPhoto;
