import "./PhotoFrame.scss";
import { Link } from "react-router-dom";
import { RootState } from "../../../store/store";
import { MouseEventHandler, useEffect, useRef } from "react";
import { DownloadSvg } from "../../../assets/svg/exports";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { dowloadAndCleanup } from "../../../util/helpers/functions/triggerDowload";
import { selectMainLoader, setMainLoader } from "../../../store/loaderSlice";
import { resetPhotosStatus, selectPhotoById } from "../../../store/photosSlice";
import { fetchPhotoForDownload } from "../../../util/helpers/functions/fetchPhotoForDownload";

interface PhotoFrameProps {
    id: string;
    isLastElem: boolean;
}

const PhotoFrame = ({ id, isLastElem }: PhotoFrameProps) => {
    const dispatch = useAppDispatch();
    const isLoaderOn = useAppSelector(selectMainLoader);
    const photo = useAppSelector((state: RootState) =>
        selectPhotoById(state, id)
    );
    const lastPhotoRef = useRef<HTMLElement | null>(null);

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

    useEffect(() => {
        if (lastPhotoRef.current && isLoaderOn) {
            setTimeout(() => {
                dispatch(setMainLoader(false));
            }, 1000)
        }
    }, [dispatch, isLoaderOn]);

    return (
        <article
            className="frame-container"
            ref={isLastElem ? lastPhotoRef : null}
        >
            <div className="frame">
                <img
                    src={photo.urls.small_object_url}
                    alt={returnPhotoAlt()}
                    className="photograph"
                />
                <address className="author">
                    <Link
                        to={`/user/${photo.user.username}`}
                        onClick={handleAuthorClick}
                    >
                        <img
                            src={photo.user.profile_image.small}
                            alt="Author"
                        />
                        <h2>{photo.user.name}</h2>
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
