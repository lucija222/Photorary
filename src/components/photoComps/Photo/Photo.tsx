import "./Photo.scss";
import { Link } from "react-router-dom";
import { MouseEventHandler } from "react";
import { RootState } from "../../../store/store";
import { DownloadSvg } from "../../../assets/svg/exports";
import { photoAlt } from "../../../util/helpers/functions/photoAlt";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setFullscreenPhoto } from "../../../store/fullscreenPhotoSlice";
import { resetPhotosStatus, selectPhotoById } from "../../../store/photosSlice";
import { dowloadAndCleanup } from "../../../util/helpers/functions/triggerDowload";
import { fetchPhotoForDownload } from "../../../util/helpers/functions/fetchPhotoForDownload";

interface PhotoProps {
    id: string;
    isInGrid: boolean;
}

const Photo = ({ id, isInGrid }: PhotoProps) => {
    const dispatch = useAppDispatch();
    const photo = useAppSelector((state: RootState) =>
        selectPhotoById(state, id)
    );

    const { name, username, profile_image } = photo.user;
    const { regular, small_object_url } = photo.urls;
    const { description } = photo;

    const handlePhotoDownload: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.stopPropagation();
        const imgObjectUrl = await fetchPhotoForDownload(photo.urls.full);
        if (imgObjectUrl) {
            dowloadAndCleanup(imgObjectUrl, id);
        }
    };

    const handleAuthorClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.stopPropagation();
        dispatch(resetPhotosStatus());
    };

    const handlePhotoClick: MouseEventHandler<HTMLImageElement> = (e) => {
        e.stopPropagation();
        if (isInGrid) {
            dispatch(setFullscreenPhoto(id));
        }
    };

    return (
        <>
            <img
                src={isInGrid ? small_object_url : regular}
                alt={photoAlt(description, name)}
                className={isInGrid ? "photograph" : "photograph disable-click"}
                onClick={handlePhotoClick}
            />
            <address className="author">
                <Link to={`/user/${username}`} onClick={handleAuthorClick}>
                    <img src={profile_image.small} alt="Author" />
                    <h2>{name}</h2>
                </Link>
                <button type="button" onClick={handlePhotoDownload}>
                    <DownloadSvg />
                </button>
            </address>
        </>
    );
};

export default Photo;
