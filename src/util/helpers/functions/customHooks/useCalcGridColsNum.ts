import { MutableRefObject, useEffect, useState } from "react";

type GridRef = MutableRefObject<HTMLElement | null>;

const useCalcGridColsNum = (gridRef: GridRef, isPhotoGrid: boolean) => {
    const [gridColumnCount, setGridColumnCount] = useState<number>(1);

    useEffect(() => {
        const gridElem = gridRef.current;

        const resizeObserver = new ResizeObserver(
            (entries: ResizeObserverEntry[]) => {
                const minColumnWidth =  isPhotoGrid ? 355 : 325;

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
    }, [gridRef, isPhotoGrid]);

    return gridColumnCount;
};

export default useCalcGridColsNum;