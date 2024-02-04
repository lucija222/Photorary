import "./PhotoFrame.scss";
import { selectPhotoById } from "../../../store/photosSlice";
import { RootState } from "../../../store/store";
import { useAppSelector } from "../../../store/hooks";
import { Link } from "react-router-dom";
import { DownloadSvg } from "../../../assets/svg/exports";
import { MouseEventHandler } from "react";
import { fetchPhotoForDownload } from "../../../util/helpers/functions/fetchPhotoForDownload";
import { dowloadAndCleanup } from "../../../util/helpers/functions/triggerDowload";

interface PhotoFrameProps {
    photoId: string;
}

const PhotoFrame = ({ photoId }: PhotoFrameProps) => {
    const photo = useAppSelector((state: RootState) =>
        selectPhotoById(state, photoId)
    );
    
    const { description, alt_description } = photo;
    const { name, username } = photo.user;
    const { small, regular, full } = photo.urls;
    const routerPath = `/user/${username}`;
    const authorPhotoUrl = photo.user.profile_image.small;

    const returnPhotoAlt = (): string => {
        if (description) {
            return description;

        } else if (alt_description) {
            return alt_description;

        } else {
            return `By ${name}`;
        }
    };

    const handlePhotoDownload: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const imgObjectUrl = await fetchPhotoForDownload(full);        

        if (imgObjectUrl) {
           dowloadAndCleanup(imgObjectUrl, photoId);
        }
    }

    return (
        <article className="frame-container">
            <div className="frame">
                <img
                    src={regular}
                    alt={returnPhotoAlt()}
                    className="photograph"
                    srcSet={`${small} 400w, ${regular} 1080w`}
                    sizes="(max-width: 450px) 400px,"
                />
                <address className="author">
                    <Link to={routerPath}>
                        <img src={authorPhotoUrl} alt="Author" />
                        <h2>{name}</h2>
                    </Link>
                    <button type="button" onClick={handlePhotoDownload}>
                        <DownloadSvg />
                    </button>
                </address>
            </div>
        </article>
    );
};

export default PhotoFrame;
