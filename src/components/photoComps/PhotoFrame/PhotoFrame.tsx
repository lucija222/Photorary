import "./PhotoFrame.scss";
import { Link } from "react-router-dom";
import { RootState } from "../../../store/store";
import { MouseEventHandler, useRef } from "react";
import { DownloadSvg } from "../../../assets/svg/exports";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { dowloadAndCleanup } from "../../../util/helpers/functions/triggerDowload";
import { resetPhotosStatus, selectPhotoById } from "../../../store/photosSlice";
import { fetchPhotoForDownload } from "../../../util/helpers/functions/fetchPhotoForDownload";
import useTurnOffLoaders from "../../../util/helpers/functions/customHooks/useTurnOffLoaders";
import useInfiniteScroll from "../../../util/helpers/functions/customHooks/useInfiniteScroll";

interface PhotoFrameProps {
    id: string;
    isLastElem: boolean;
    isObserverElem: boolean;
}

const PhotoFrame = ({ id, isLastElem, isObserverElem }: PhotoFrameProps) => {
    const dispatch = useAppDispatch();
    const photo = useAppSelector((state: RootState) =>
        selectPhotoById(state, id)
    );
    const lastPhotoRef = useRef<HTMLDivElement | null>(null);
    const observerElemRef = useInfiniteScroll();
    useTurnOffLoaders(lastPhotoRef, observerElemRef, true);
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
            <article className="frame-container">
                <div className="frame" ref={isLastElem ? lastPhotoRef : null}>
                    <img
                        src={photo.urls.small_object_url}
                        alt={returnPhotoAlt()}
                        className="photograph"
                    />
                    <address className="author">
                        <Link
                            to={`/user/${username}`}
                            onClick={handleAuthorClick}
                        >
                            <img src={profile_image.small} alt="Author" />
                            <h2>{name}</h2>
                        </Link>
                        {isObserverElem && (
                            <div
                                className="observer-div"
                                ref={observerElemRef}
                            ></div>
                        )}
                        <button type="button" onClick={handlePhotoDownload}>
                            <DownloadSvg />
                        </button>
                    </address>
                </div>
            </article>
        </>
    );
};

export default PhotoFrame;
