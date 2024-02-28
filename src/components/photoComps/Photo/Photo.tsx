import "./Photo.scss";
import { Link } from "react-router-dom";
import { MouseEventHandler } from "react";
import { RootState } from "../../../store/store";
import { DownloadSvg } from "../../../assets/svg/exports";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { resetPhotosStatus, selectPhotoById } from "../../../store/photosSlice";
import { dowloadAndCleanup } from "../../../util/helpers/functions/triggerDowload";
import { fetchPhotoForDownload } from "../../../util/helpers/functions/fetchPhotoForDownload";

interface PhotoProps {
    id: string;
}

const Photo = ({ id }: PhotoProps) => {
    const dispatch = useAppDispatch();
    const photo = useAppSelector((state: RootState) =>
        selectPhotoById(state, id)
    );

    const { name, username, profile_image } = photo.user;

    const returnPhotoAlt = (): string => {
        const description = photo.description;
        const alt_description = photo.alt_description;
        const name = photo.user.name;
        if (description) {
            return description;
        } else if (alt_description) {
            return alt_description;
        } else {
            return `By ${name}`;
        }
    };

    const handlePhotoDownload: MouseEventHandler<HTMLButtonElement> = async (
        e
    ) => {
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

    return (
        <>
            <img
                src={photo.urls.small_object_url}
                alt={returnPhotoAlt()}
                className="photograph"
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
