import { MutableRefObject, useEffect, useState } from "react";
import RenderDynamicGridColumns from "../../RenderDynamicGridColumns/RenderDynamicGridColumns";

interface ResizeObserverCompProps {
    gridRef: MutableRefObject<HTMLDivElement | null>;
    isPhotos: boolean;
}

const ResizeObserverComp = ({ gridRef, isPhotos }: ResizeObserverCompProps) => {
    const [gridColumnCount, setGridColumnCount] = useState<number>(1);

    useEffect(() => {
        const gridElem = gridRef.current;

        const resizeObserver = new ResizeObserver(
            (entries: ResizeObserverEntry[]) => {
                const minColumnWidth =  isPhotos ? 355 : 325;

                for (let entry of entries) {
                    const gridWidth = entry.borderBoxSize[0].inlineSize;
                    
                    if (gridWidth < minColumnWidth) {
                        setGridColumnCount(1);

                    } else {
                        const columnCount = Math.floor(
                            gridWidth / minColumnWidth
                        );
                        const finalColumnCount = Math.max(1, columnCount);
                        setGridColumnCount(finalColumnCount);
                    }
                }
            }
        );

        if (gridElem) {
            resizeObserver.observe(gridElem);
        }

        return () => {
            resizeObserver.disconnect();
        };
    });

    return (
        <RenderDynamicGridColumns
            gridColumnCount={gridColumnCount}
            isPhotos={isPhotos}
        />
    );
};

export default ResizeObserverComp;
