import { useAppSelector } from "../../../store/hooks";
import { selectPhotosIds } from "../../../store/photosSlice";
import PhotoGridColumn from "../PhotoGridColumn/PhotoGridColumn";

interface RenderDynamicGridColumnsProps {
    mainGridColumnCount: number;
}

const RenderDynamicGridColumns = ({
    mainGridColumnCount,
}: RenderDynamicGridColumnsProps) => {

    const photosIds = useAppSelector(selectPhotosIds);
    const photoIdsArraysPerColumn: string[][] = Array.from(
        { length: mainGridColumnCount },
        () => []
    );
    photosIds.forEach((photoId, index) => {
        const columnIndex = index % mainGridColumnCount;
        photoIdsArraysPerColumn[columnIndex].push(photoId);
    });

    const renderChildGrids = () => {
        const childGridsArray: JSX.Element[] = [];

        for (let i = 0; i < mainGridColumnCount + 0; i++) {
            const photoIdsArray = photoIdsArraysPerColumn[i];
            childGridsArray.push(
                <PhotoGridColumn
                    key={`child-photo-grid-${i}`}
                    photoIdsArray={photoIdsArray}
                />
            );
        }

        return childGridsArray.map((grid) => {
            return grid;
        });
    };

    return <>{renderChildGrids()}</>;
};

export default RenderDynamicGridColumns;
