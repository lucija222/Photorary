import "./Photo.scss";
import { Link } from "react-router-dom";
import { MouseEventHandler } from "react";
import { RootState } from "../../../store/store";
import DownloadButton from "../../buttons/DownloadButton";
import { photoAlt } from "../../../util/helpers/functions/photoAlt";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { resetPhotosStatus, selectPhotoById } from "../../../store/photosSlice";
import { fetchFullscreenPhoto } from "../../../store/asyncThunks/fetchFullscreenPhoto";

interface PhotoProps {
    id: string;
    isInGrid: boolean;
}

const Photo = ({ id, isInGrid }: PhotoProps) => {
    const dispatch = useAppDispatch();
    const photo = useAppSelector((state: RootState) => selectPhotoById(state, id));
    const { name, username, profile_image } = photo.user;
    const { small_object_url, regular, regular_object_url, full } = photo.urls;    
    const { description } = photo;

    const handleAuthorClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.stopPropagation();
        dispatch(resetPhotosStatus());
    };

    const handlePhotoClick: MouseEventHandler<HTMLImageElement> = async (e) => {
        e.stopPropagation();
        if (isInGrid) {
            dispatch(fetchFullscreenPhoto({id: id, url: regular}));
        }
    };

    return (
        <>
            <img
                src={isInGrid ? small_object_url : regular_object_url}
                alt={photoAlt(description, name)}
                className={isInGrid ? "photograph" : "photograph disable-click"}
                onClick={handlePhotoClick}
            />
            <address className="author">
                <Link to={`/user/${username}`} onClick={handleAuthorClick}>
                    <img src={profile_image.small} alt="Author" />
                    <h2>{name}</h2>
                </Link>
                <DownloadButton id={id} url={full}/>
            </address>
        </>
    );
};

export default Photo;
