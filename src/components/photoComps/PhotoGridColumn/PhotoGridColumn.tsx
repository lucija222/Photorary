import "./PhotoGridColumn.scss";
import PhotoFrame from "../PhotoFrame/PhotoFrame";

interface PhotoGridColumnProps {
    photoIdsArray: string[],
}

const PhotoGridColumn = ({ photoIdsArray }: PhotoGridColumnProps) => {
    
    const renderPhotos = () => {
        return photoIdsArray.map((photoId) => {
            return <PhotoFrame key={photoId} photoId={photoId}/>
        })
    }

    return (
        <div className="photo-grid-column">
            {renderPhotos()}
        </div>
    );
};

export default PhotoGridColumn;