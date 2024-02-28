import { useAppSelector } from "../../../store/hooks";
import { selectPhotosIds } from "../../../store/photosSlice";
import GridColumn from "../GridColumn/GridColumn";
import { selectUsersIds } from "../../../store/usersSlice";
import { MutableRefObject } from "react";
import useCalcGridColsNum from "../../../util/helpers/functions/customHooks/useCalcGridColsNum";

interface RenderDynamicGridColumnsProps {
    gridRef: MutableRefObject<HTMLElement | null>;
    isPhotoGrid: boolean;
}

const RenderDynamicGridColumns = ({
    gridRef,
    isPhotoGrid
}: RenderDynamicGridColumnsProps) => {

    const columnCount = useCalcGridColsNum(gridRef, isPhotoGrid);

    const idArray = useAppSelector(isPhotoGrid ? selectPhotosIds : selectUsersIds);
    const lastId = idArray[idArray.length - 1];
    const idForObserver = idArray[idArray.length - 15];
    
    const idArraysPerColumn: string[][] = Array.from(
        { length: columnCount },
        () => []
    );

    idArray.forEach((photoId, index) => {
        const columnIndex = index % columnCount;
        idArraysPerColumn[columnIndex].push(photoId);
    });

    const renderGridColumns = () => {
        const gridColumnsArray: JSX.Element[] = [];

        for (let i = 0; i < columnCount; i++) {
            const photoIdsArray = idArraysPerColumn[i];
            gridColumnsArray.push(
                <GridColumn
                    key={`grid-column-${i}`}
                    idsArray={photoIdsArray}
                    lastId={lastId}
                    idForObserver={idForObserver}
                    isPhotoGrid={isPhotoGrid}
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
