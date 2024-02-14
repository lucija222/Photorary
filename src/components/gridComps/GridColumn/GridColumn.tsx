import "./GridColumn.scss";
import PhotoFrame from "../../photoComps/PhotoFrame/PhotoFrame";
import User from "../../userComps/User/User";

interface GridColumnProps {
    idsArray: string[];
    lastId: string;
    isPhotos: boolean;
}

const GridColumn = ({ idsArray, lastId, isPhotos }: GridColumnProps) => {
    const renderElements = () => {
        return idsArray.map((id) => {
            const isLastElem = lastId === id;

            return isPhotos ? (
                <PhotoFrame key={id} id={id} isLastElem={isLastElem} />
            ) : (
                <User key={id} id={id} isLastElem={isLastElem} />
            );
        });
    };

    return <div className={isPhotos ? "photo-grid-column" : "user-grid-column"}>{renderElements()}</div>;
};

export default GridColumn;
