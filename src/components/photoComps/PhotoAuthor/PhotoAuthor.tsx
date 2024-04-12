import { Link } from "react-router-dom";
import "./PhotoAuthor.scss";
import { UserProfileImage } from "../../../util/helpers/types";
import { MouseEventHandler } from "react";
import { resetPhotosStatus } from "../../../store/photosSlice";
import { useAppDispatch } from "../../../store/hooks";

interface PhotoAuthorProps {
    username: string;
    profile_image: UserProfileImage;
    name: string;
}

const PhotoAuthor = ({ username, profile_image, name }: PhotoAuthorProps) => {
    const dispatch = useAppDispatch();

    const handleAuthorClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.stopPropagation();
        dispatch(resetPhotosStatus());
    };

    return (
        <address className="author">
            <Link to={`/user/${username}`} onClick={handleAuthorClick}>
                <img src={profile_image.small} alt="Author" />
                <h2>{name}</h2>
            </Link>
        </address>
    );
};

export default PhotoAuthor;
