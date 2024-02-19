import "./GridColumn.scss";
import PhotoFrame from "../../photoComps/PhotoFrame/PhotoFrame";
import User from "../../userComps/User/User";

interface GridColumnProps {
    idsArray: string[];
    lastId: string;
    idForObserver: string;
    isPhotoGrid: boolean;
}

const GridColumn = ({
    idsArray,
    lastId,
    idForObserver,
    isPhotoGrid,
}: GridColumnProps) => {

    const renderElements = () => {
        return idsArray.map((id) => {
            const isLastElem = lastId === id;
            const isObserverElem = idForObserver === id;
            const Component = isPhotoGrid ? PhotoFrame : User;

            return <Component key={id} id={id} isLastElem={isLastElem} isObserverElem={isObserverElem} />
        });
    };

    return (
        <div className={isPhotoGrid ? "photo-grid-column" : "user-grid-column"}>
            {renderElements()}
        </div>
    );
};

export default GridColumn;
