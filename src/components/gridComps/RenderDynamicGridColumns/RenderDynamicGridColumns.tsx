import { useAppSelector } from "../../../store/hooks";
import { selectPhotosIds } from "../../../store/photosSlice";
import GridColumn from "../GridColumn/GridColumn";
import { selectUsersIds } from "../../../store/usersSlice";

interface RenderDynamicGridColumnsProps {
    gridColumnCount: number;
    isPhotos: boolean;
}

const RenderDynamicGridColumns = ({
    gridColumnCount,
    isPhotos,
}: RenderDynamicGridColumnsProps) => {

    const idArray = useAppSelector(isPhotos ? selectPhotosIds : selectUsersIds);
    const lastId = idArray[idArray.length - 1];

    const idArraysPerColumn: string[][] = Array.from(
        { length: gridColumnCount },
        () => []
    );

    idArray.forEach((photoId, index) => {
        const columnIndex = index % gridColumnCount;
        idArraysPerColumn[columnIndex].push(photoId);
    });

    const renderGridColumns = () => {
        const gridColumnsArray: JSX.Element[] = [];

        for (let i = 0; i < gridColumnCount; i++) {
            const photoIdsArray = idArraysPerColumn[i];
            gridColumnsArray.push(
                <GridColumn
                    key={`grid-column-${i}`}
                    idsArray={photoIdsArray}
                    lastId={lastId}
                    isPhotos={isPhotos}
                />
            );
        }

        return gridColumnsArray.map((grid) => {
            return grid;
        });
    };

    return <>{renderGridColumns()}</>;
};

export default RenderDynamicGridColumns;
