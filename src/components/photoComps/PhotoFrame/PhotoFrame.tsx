import  "./PhotoFrame.scss";
import Photo from "../Photo/Photo";
import { useAppSelector } from "../../../store/hooks";
import { selectFullscreenPhotoId } from "../../../store/fullscreenPhotoSlice";

const PhotoFrame = () => {
    const photoId = useAppSelector(selectFullscreenPhotoId);

    return (
        <article className="frame-container">
            <div className="frame">
                <Photo id={photoId} isInGrid={false}/>
            </div>
        </article>
    );
};

export default PhotoFrame;
