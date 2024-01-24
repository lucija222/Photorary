import "./PhotoFrame.scss";
import { selectPhotoById } from "../../../store/photosSlice";
import { RootState } from "../../../store/store";
import { useAppSelector } from "../../../store/hooks";

interface PhotoFrameProps {
    photoId: string;
}

const PhotoFrame = ({ photoId }: PhotoFrameProps) => {
    const photo = useAppSelector((state: RootState) =>
        selectPhotoById(state, photoId)
    );
    
    const url = photo.urls.regular;
    const author = photo.user.name;
    // const authorUsername = photo.user.username; 

    return (
        <div className="frame-container" >
            <div className="frame">
                <img
                    src={url}
                    alt={`Photography by ${author}`} //Change alt
                />
                <p className="author">By {author}</p>
            </div>
        </div>
    );
};

export default PhotoFrame;
