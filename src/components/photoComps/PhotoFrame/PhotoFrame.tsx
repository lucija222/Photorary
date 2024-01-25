import "./PhotoFrame.scss";
import { selectPhotoById } from "../../../store/photosSlice";
import { RootState } from "../../../store/store";
import { useAppSelector } from "../../../store/hooks";
import { Link } from "react-router-dom";

interface PhotoFrameProps {
    photoId: string;
}

const PhotoFrame = ({ photoId }: PhotoFrameProps) => {
    const photo = useAppSelector((state: RootState) =>
        selectPhotoById(state, photoId)
    );

    const url = photo.urls.regular;
    const author = photo.user.name;
    const authorUsername = photo.user.username;
    const path = `/user/${authorUsername}`;
    const authorPhotoUrl = photo.user.profile_image.small;

    return (
        <article className="frame-container">
            <div className="frame">
                <img
                    src={url}
                    alt={`Photograph by ${author}`}
                    className="photograph"
                />

                <address className="author">
                    <Link to={path}>
                        <img src={authorPhotoUrl} alt="Author" />
                        {author}
                    </Link>
                </address>
            </div>
        </article>
    );
};

export default PhotoFrame;
