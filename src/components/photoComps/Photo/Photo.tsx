import "./Photo.scss";
import { MouseEventHandler } from "react";
import { RootState } from "../../../store/store";
import PhotoAuthor from "../PhotoAuthor/PhotoAuthor";
import PhotoDownload from "../PhotoDownload/PhotoDownload";
import { selectPhotoById } from "../../../store/photosSlice";
import { photoAlt } from "../../../util/helpers/functions/photoAlt";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchFullscreenPhoto } from "../../../store/asyncThunks/fetchFullscreenPhoto";
import { selectFullscreenPhotoId } from "../../../store/fullscreenPhotoSlice";

interface PhotoProps {
    id: string;
}

const Photo = ({ id }: PhotoProps) => {
    const dispatch = useAppDispatch();
    const photo = useAppSelector((state: RootState) => selectPhotoById(state, id));
    const fullscreenPhotoId = useAppSelector(selectFullscreenPhotoId);
    const isFullscreenPhoto = fullscreenPhotoId === id;
    const { name, username, profile_image } = photo.user;
    const { small_object_url, regular, regular_object_url, full } = photo.urls;    
    const { description } = photo;

    const handlePhotoClick: MouseEventHandler<HTMLImageElement> = async (e) => {
        e.stopPropagation();
        dispatch(fetchFullscreenPhoto({id: id, url: regular}));
    };

    return (
        <>
            <img
                src={isFullscreenPhoto ? regular_object_url : small_object_url}
                alt={photoAlt(description, name)}
                className={isFullscreenPhoto ? "photograph disable-click" : "photograph"}
                onClick={handlePhotoClick}
            />
            <PhotoAuthor username={username} profile_image={profile_image} name={name} />
            <PhotoDownload id={id} url={full}/>
        </>
    );
};

export default Photo;
