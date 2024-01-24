import { MutableRefObject, useEffect, useState } from "react";
import RenderDynamicGridColumns from "../RenderDynamicGridColumns/RenderDynamicGridColumns";

interface ObserverProps {
    mainPhotosGridRef: MutableRefObject<HTMLDivElement | null>
}

const Observer = ({mainPhotosGridRef}: ObserverProps) => {
    const [mainGridColumnCount, setMainGridColumnCount] = useState<number>(1);

    useEffect(() => {
        const element = mainPhotosGridRef.current;

        const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
            const minColumnWidth = 355;
    
            for (let entry of entries) {
                const elementWidth = entry.borderBoxSize[0].inlineSize;

                if (elementWidth) {
                    const columnCount = Math.floor(elementWidth / minColumnWidth);
                    const finalColumnCount = Math.max(1, columnCount);
                    setMainGridColumnCount(finalColumnCount)
                }
            }
        });

        if (element) {
            resizeObserver.observe(element);
        }

        return () => {
            resizeObserver.disconnect();
        };
    })

    return (
        <RenderDynamicGridColumns mainGridColumnCount={mainGridColumnCount} />
    );
};

export default Observer;